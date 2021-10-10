import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  createTableExperimento,
  createTableDivice,
  createTableData,
  adddataExperimento,
  getExperimento,
  getExperimento1
} from '../services/db-service';
var experimentos;
var dataExper;
export default App = () => {
  var accounts = [
    {
      accNumber: '56456454',
      accType: 'D',
      productCode: '1454541',
      availBalance: '987436.46',
    },
    {
      accNumber: '12424345645',
      accType: 'D',
      productCode: '154545641',
      availBalance: '500397.64',
    },
    {
      accNumber: '4554545664',
      accType: 'D',
      productCode: '44545',
      availBalance: '2467.02',
    },
  ];

  const [errors, setExErrors] = useState(false)

  const dataconsult = async () => {
    getExperimento(value1 => {
      getExperimento1(value => {
        experimentos = value1
        dataExper = value
        setExErrors(true)
      })
    })
  }

  useEffect(() => {
    dataconsult()
  }, []);

  useEffect(() => {
    console.log("data pasada", experimentos)
    console.log("data pasada", dataExper)
  }, [errors]);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Account</DataTable.Title>
          <DataTable.Title>Code</DataTable.Title>
          <DataTable.Title>
            Balance Available
          </DataTable.Title>
        </DataTable.Header>
        {
          accounts.map(account => {
            return (
              <DataTable.Row
                key={account.accNumber} // you need a unique key per item
                onPress={() => {
                  // added to illustrate how you can make the row take the onPress event and do something
                  console.log(`selected account ${account.accNumber}`)
                }}
              >
                <DataTable.Cell>
                  {account.accNumber}
                </DataTable.Cell>
                <DataTable.Cell style={styles.messageColumn}>
                  {account.productCode}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {account.availBalance}
                </DataTable.Cell>
              </DataTable.Row>
            )
          })}
      </DataTable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});