/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import React from 'react';

import { useHistory } from 'react-router-dom';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
    const unsubscribe = configapp
      .database()
      .ref(`Food`)
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
const Food = (props) => {
  const abc = Doc();
  const his = useHistory();
  const FoodCall = (_id) => {
    configapp.database().ref(`Food/${_id}`).remove();
  };
  const AccessoriesEdit = (_id) => {
    his.push(`EditProduct/Food/${_id}`);
  };
  return (
    <ResponsiveDrawer>
      <Button
        onClick={(e) => {
          his.push('/Admin');
        }}
      >
        Back
      </Button>
      <h3 style={{ textAlign: 'center' }}>Food</h3>
      <Fab
        onClick={() => {
          his.push('AddEditProduct/Food');
        }}
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          top: 70,
          right: 16
        }}
      >
        <AddIcon />
      </Fab>
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          style={{ width: '100%', color: 'green' }}
          columns={[
            { field: 'Company', width: 120 },
            { field: 'Cost', width: 100 },
            { field: 'Expiredate', width: 150 },
            { field: 'Quantity', width: 80 },
            { field: 'Title', width: 160 },
            {
              field: 'Image',
              headerName: 'Image',
              width: 200,
              filterable: false,

              renderCell: (params) => {
                return <img src={params.row.Image} width="150" />;
              }
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
                      onClick={() => FoodCall(params.row.id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => AccessoriesEdit(params.row.id)}
                      variant="contained"
                      color="primary"
                    >
                      Edit
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
    </ResponsiveDrawer>
  );
};
export default Food;
