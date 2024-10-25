import React from 'react';
import StudentSelect from '../components/StudentSelect';
import StudentTable from '../components/StudentTable';
import Layout from '../components/Layout';

const Students = () => {
  return (
    <Layout>
      <StudentSelect/>
      <StudentTable/>
    </Layout>
  );
}

export default Students;