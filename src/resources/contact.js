import Contact from '../controllers/contact';
import validateToken from '../middlewares/validate-token';
/**
 * 
 * 
 */
module.exports = app => {
    app.route('/contact/all').get(validateToken, Contact.all);
    /**
     * Create the remaining routes
     * get,
     * create,
     * delete,
     * update,
     * remove
     */

    app.route('/contact/:id').get(validateToken, Contact.get);
    app.route('/contact').post(validateToken, Contact.create);
    app.route('/contact/:id').delete(validateToken, Contact.delete);
    app.route('/contact/:id').put(validateToken, Contact.update);
    app.route('/contact/remove/:id').put(validateToken, Contact.remove);
};
