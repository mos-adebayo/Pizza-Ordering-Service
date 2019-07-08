module.exports = {
    processError: function (error, serverError) {
        if(serverError !== undefined){
            return { error: 'Currently unable to complete request'}
        }else{
            if(error.name !== undefined){
                if(error.name === 'SequelizeValidationError'){
                    let error_ = [];
                    for(let err of error.errors){
                        error_.push({ [err.path]: err.message});
                    }
                    return { error: error_};
                }
                else if(error.name === 'SequelizeUniqueConstraintError'){
                    let error_ = [];
                    for(let err of error.errors){
                        error_.push(err.message);
                    }
                    return { error: error_};
                }
                else if(error.name === 'SequelizeForeignKeyConstraintError'){
                    return { error: error.parent.detail};
                }
                else if(error.name === 'SequelizeDatabaseError'){
                    return { error: 'Values does not meet data integrity standard'};
                }else if(typeof error === 'string' || error instanceof String){
                    return { error: error}
                }else{
                    return { error: 'Currently unable to complete request'}
                }
            }else{
                return { error: error }
            }
        }
    },
    processServerError: function (error) {
        return { error: 'Currently unable to complete request'}

    },
    processResponse: function (data) {
        return { data: data};
    }
};
