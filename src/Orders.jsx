/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import React from 'react';

import { useHistory } from 'react-router-dom';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import ResponsiveDrawer from './admindashborad';
import { configapp } from './firebase';

const riceFilterModel = {
  items: [
    { columnField: 'commodity', operatorValue: 'contains', value: 'rice' }
  ]
};

const Doc = (props) => {
  const [alldata, SetData] = React.useState([{ id: 1 }]);

  React.useEffect(async () => {
    const cities = [];
    const b = 0;
    const id = 0;
    const unsubscribe = configapp
      .database()
      .ref(`Orders`)

      .on('value', (user) => {
        const a = [];
        user.forEach((doc) => {
          a.push({ ...doc.val(), id: doc.key });
        });

        SetData(a);
      });

    return () => {
      unsubscribe();
    };
  }, []);
  return alldata;
};
const Orders = (props) => {
  const abc = Doc();
  const his = useHistory();
  const OrdersCall = (_id) => {
    configapp.database().ref(`Orders/${_id}`).remove();
  };
  const SeeUser = (_id) => {
    his.push(`/User/${_id}`);
  };
  return (
    <ResponsiveDrawer>
      <div
        style={{
          background: `url(./Pic1.jpg) no-repeat center center fixed`,
          height: '200vh',
          backgroundSize: 'cover'
        }}
      >
        <Button
          onClick={(e) => {
            his.push('/Admin');
          }}
        >
          Back
        </Button>
        <h3 style={{ textAlign: 'center' }}>All Orders</h3>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            autoHeight
            style={{ height: 400, width: '100%', color: 'green' }}
            columns={[
              { field: 'Date', width: 200 },
              { field: 'Name', width: 150 },
              { field: 'Number', width: 200 },
              { field: 'Quantity', width: 100 },
              { field: 'TotalPrice', width: 100 },
              {
                field: 'UserName',

                width: 150
              },

              {
                field: 'actions',
                headerName: 'Actions',
                width: 200,
                renderCell: (params) => {
                  return (
                    <>
                      <Button
                        style={{ marginRight: '4px' }}
                        onClick={() => OrdersCall(params.row.id)}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => SeeUser(params.row.UserId)}
                        variant="contained"
                        color="primary"
                      >
                        UserDetail
                      </Button>
                    </>
                  );
                }
              }
            ]}
            rows={abc}
            components={{
              Toolbar: GridToolbar
            }}
          />
        </div>
      </div>
    </ResponsiveDrawer>
  );
};
export default Orders;
