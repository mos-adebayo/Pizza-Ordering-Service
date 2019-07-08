import { appConstants } from './constant';
import { appHelpers } from './helper';

export function getPizzaTypes() {
    return appHelpers.getRequest(`${appConstants.BASE_URL }/pizza-types`)
        .then(res => {
            return res;
        });
}
export function getPizzaSizes() {
    return appHelpers.getRequest(`${appConstants.BASE_URL }/pizza-sizes`)
        .then(res => {
            return res;
        });
}

export function searchOrders(payload) {
    return appHelpers.postRequest(`${appConstants.BASE_URL }/orders/search`, payload)
        .then(res => {
            return res;
        })
}
export function createOrder(payload) {
    return appHelpers.postRequest(`${appConstants.BASE_URL }/order`, payload)
        .then(res => {
            return res;
        })
}