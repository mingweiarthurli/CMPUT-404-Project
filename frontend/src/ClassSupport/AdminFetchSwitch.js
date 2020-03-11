import {AddProduct, AddCategory, AddPromotion} from './APICalls/CreateAPI';
import {DeleteCategory, DeleteProduct, DeletePromotion} from './APICalls/DeleteAPI';

export const AdminFetchSwitch = (method, inputs, action) => {
    let TableQL = '';
    let ValueQL = '';
    let UpdateSpecialQL = '';
    for (var field in inputs) {
        if (method === 'PUT'){
            UpdateSpecialQL+=(`${field} = '${inputs[field]}',`);
        } else {
            TableQL+=(`${field},`)
            ValueQL+=(`'${inputs[field]}',`)
        }
    }
    UpdateSpecialQL = UpdateSpecialQL.slice(0,-1)
    TableQL = TableQL.slice(0,-1)
    ValueQL = ValueQL.slice(0,-1)
    if (method === 'POST'){
        if (action === 'add_category'){
            AddCategory(ValueQL)
        } else if (action === 'add_product'){
            AddProduct(ValueQL)
        } else if (action === 'add_promotion'){
            AddPromotion(ValueQL)
        }
    } else if (method === 'DELETE'){
        if (action === 'delete_category'){
            DeleteCategory(ValueQL)
        } else if (action === 'delete_product'){
            DeleteProduct(ValueQL)
        } else if (action === 'delete_promotion'){
            DeletePromotion(ValueQL)
        }
    } else {
        console.log(`UPDATE \`products\` SET ${UpdateSpecialQL} WHERE \`product_id\` = '${inputs.product_id}'`)
    }
}