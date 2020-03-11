export const AdminInsertSwitch = key => {
    let current = null; //refresh and re-init current 
    switch(key){
        case 'add_category':
            current = ['category', 'img'];
            break;
        case 'delete_category':
            current = ['category'];
            break;
        case 'add_product':
            current = ['title', 'category', 'descr', 'img'];
            break;
        case 'update_product':
            current = ['product_id', 'instock', 'promo', 'price'];
            break;
        case 'delete_product':
            current = ['product_id'];
            break;
        case 'add_promotion':
            current = ['title', 'promo_type', 'descr', 'offer_ends', 'img'];
            break;
        case 'delete_promotion':
            current = ['promotion_id'];
            break;
        default:
            break;
    }
    return current;
}