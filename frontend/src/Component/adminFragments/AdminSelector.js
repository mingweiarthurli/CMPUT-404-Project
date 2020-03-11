import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Dropdown, Container, Divider, Segment, Header, Button } from 'semantic-ui-react';

const adminOptions = [
    {
        key: 'add_category',
        text: 'add category',
        value: 'add_category'
    },
    {
        key: 'delete_category',
        text: 'delete category',
        value: 'delete_category'
    },
    {
        key: 'add_product',
        text: 'add product',
        value: 'add_product'
    },
    {
        key: 'update_product',
        text: 'update product',
        value: 'update_product'
    },
    {
        key: 'delete_product',
        text: 'delete product',
        value: 'delete_product'
    },
    {
        key: 'add_promotion',
        text: 'add promotion',
        value: 'add_promotion'
    },
    {
        key: 'delete_promotion',
        text: 'delete promotion',
        value: 'delete_promotion'
    }
];

const AdminSelector = () => {
    const [sel, setSel] = useState('');
    var value = sel;
    const [redir, setRedir] = useState(null);

    const handleChange = (e, {value}) => {
        setSel(value);
    };
    
    const adminRedir = () => {
        let redirString = JSON.stringify(redir).slice(1, -1);
        //console.log('redir string is: '+redirString);
        if (redir !== null){
            return <Redirect to={redirString} />
        }
    }

    return (
        <Container textAlign='center'>
            {adminRedir()}
            <Divider clearing />
            <Header as='h1'>Admin Page</Header>
            <Segment raised style={{marginTop:'100px'}} >
                <Dropdown
                    fluid
                    onChange={handleChange}
                    options={adminOptions}
                    placeholder='What would you like to do?'
                    selection
                    value={value}
                />
            </Segment>
            <Divider />
            <Segment.Group>
                <Segment>
                    <Header as='h3'>{value}</Header>
                </Segment>
                <Segment>
                    <Button content='Continue' primary onClick={()=>setRedir(`/admin/insert/${value}`)}/>
                </Segment>
            </Segment.Group>
        </Container>
    );
};

export default AdminSelector;