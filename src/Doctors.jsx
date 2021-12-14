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
      .ref(`Users`)
      .orderByChild('userType')
      .equalTo('doctor')
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
const Doctor = (props) => {
  const abc = Doc();
  const his = useHistory();
  const DoctorCall = (_id) => {
    configapp.database().ref(`Users/${_id}`).remove();
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
        <h3 style={{ textAlign: 'center' }}>All Doctors</h3>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            autoHeight
            style={{ height: 400, width: '100%', color: 'green' }}
            columns={[
              { field: 'ClinicAddress', width: 200 },
              { field: 'City', width: 100 },
              { field: 'Experience', width: 120 },
              { field: 'Email', width: 220 },
              { field: 'Name', width: 100 },
              {
                field: 'profileUrl',
                headerName: 'Image',
                width: 200,

                renderCell: (params) => {
                  return <img src={params.row.profileUrl} width="140" />;
                }
              },

              {
                field: 'actions',
                headerName: 'Actions',
                width: 200,
                renderCell: (params) => {
                  return (
                    <Button
                      onClick={() => DoctorCall(params.row.UID)}
                      variant="contained"
                      color="primary"
                    >
                      Delete
                    </Button>
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
export default Doctor;
