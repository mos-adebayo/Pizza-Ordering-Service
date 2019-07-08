const supertest = require('supertest');
const config =  require("./config.js");

const orderPayload = {
    customerName: "Moses Adebayo",
    pizzaSizeId:  1,
    pizzaTypeId: 1,
    address: "Lagos",
    quantity: 2
};

describe('Order (model)', function() {
    it('Should fail for empty order payload', function (done) {
        supertest(`${config.HOST_URL}`)
            .post('/order')
            .send({})
            .expect(400)
            .then(response => {
                expect(response.body.error).toBeDefined();
                done();
            });
    });

    it('Should fail for invalid quantity in order payload', function (done) {
        supertest(`${config.HOST_URL}`)
            .post('/order')
            .send({...orderPayload, quantity: "quty" })
            .expect(400)
            .then(response => {
                expect(response.body.error).toBeDefined();
                done();
            });
    });

    it('Should return valid for order payload', function (done) {
        supertest(`${config.HOST_URL}`)
            .post('/order')
            .send(orderPayload)
            .expect(201)
            .then(response => {
                expect(response.body.data).toMatchObject(orderPayload)
                done();
            });
    });

    it('Should return valid response for search order', function (done) {
        supertest(`${config.HOST_URL}`)
            .post('/orders/search')
            .send({})
            .expect(200)
            .then(response => {
                expect(response.body.data).toBeDefined();
                done();
            });
    });

    it('Should return valid response for update order', function (done) {
        supertest(`${config.HOST_URL}`)
            .post('/order')
            .send({...orderPayload, customerName: "Customer Name"})
            .expect(201)
            .then(response => {
                expect(response.body.data).toBeDefined();
                const customerId = response.body.data.id;
                supertest(`${config.HOST_URL}`)
                    .put(`/orders/${customerId}`)
                    .send({ customerName: "New Customer Name"})
                    .expect(200)
                    .then(response => {
                        expect(response.body.data).toBeDefined();
                        expect(response.body.data.customerName).toBe("New Customer Name");
                        done()
                    })
            });
    });

    it('Should return valid response for delete order', function (done) {
        supertest(`${config.HOST_URL}`)
            .post('/order')
            .send({...orderPayload, customerName: "Customer Name"})
            .expect(201)
            .then(response => {
                expect(response.body.data).toBeDefined();
                const customerId = response.body.data.id;
                supertest(`${config.HOST_URL}`)
                    .delete(`/orders/${customerId}`)
                    .expect(200)
                    .then(response => {
                        expect(response.body.data).toBeDefined();
                        expect(response.body.data).toBe("Order removed");
                        done()
                    })
            });
    });

    it('Should return error for invalid order removal', function (done) {
        supertest(`${config.HOST_URL}`)
            .delete('/orders/1222222222')
            .expect(400)
            .then(response => {
                expect(response.body.error).toBe("Order does not exist");
                done()
            })
    });
});