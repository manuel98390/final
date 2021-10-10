import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ToDoItem } from '../models';

let indice;

// enablePromise(true);
var db = openDatabase({
  name: 'SchoolDatabase.db',
  location: 'default'
},
  () => {
    console.log("algo")
  }, (error) => {
    console.error(error);
  });

export const createTableExperimento = async () => {
  //debugger
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_Experimento'",
      [],
      function (tx, res) {
        if (res.rows.length == 0) {//!= por lo que se borra cada tabla cuando se reinicis
          txn.executeSql('DROP TABLE IF EXISTS table_Experimento', []);
          txn.executeSql(
            "CREATE TABLE IF NOT EXISTS table_Experimento(Expe_id INTEGER PRIMARY KEY AUTOINCREMENT," +
            "Expe_name VARCHAR(50));",
            []
          );

          console.log('SQLite Database and table_Experimento Successfully Created..1');
        }
      }
    );
  })
};

export const createTableDivice = async () => {
  //debugger
  db.transaction(function (txn) {
    let query="CREATE TABLE IF NOT EXISTS table_Divice(TableDivi_id INTEGER primary key AUTOINCREMENT," +
    "Expe_id INTEGER, Macaddres VARCHAR(25), serviceuuid VARCHAR(255), caracteristica VARCHAR(255), "+
    " FOREIGN KEY(Expe_id) REFERENCES table_Experimento(Expe_id));"
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_Divice'",
      [],
      function (tx, res) {
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_Divice', []);
          txn.executeSql(query,
            []
          );
          console.log('SQLite Database and table_Experimento Successfully Created..2');
        }
      }
    );
  })
};

export const createTableData = async () => {
  //debugger
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_Data'",
      [],
      function (tx, res) {
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_Data', []);
          txn.executeSql(
            "CREATE TABLE IF NOT EXISTS table_Data(TableData_id INTEGER PRIMARY KEY AUTOINCREMENT," +
            "Expe_id INTEGER, TableDivi_id INTEGER, Data text, " +
            "FOREIGN KEY(Expe_id) REFERENCES table_Experimento(Expe_id)" +
            "FOREIGN KEY(TableDivi_id) REFERENCES table_Divice(TableDivi_id));",
            []
          );

          console.log('SQLite Database and table_Experimento Successfully Created..3');
        }
      }
    );
  })
};

export const adddataExperimento = async (Expe_name) => {
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_Experimento (Expe_id, Expe_name) VALUES (?,?)',
      [, Expe_name],
      (tx, results) => {
        console.log('Results', results);
        if (results.rowsAffected > 0) {
          console.log("evento registrado")
        } else alert('Registration Failed');
      }
    );
  });
};
export const adddata = (data) => {
  //debugger
  let Divi_id;
  for (const [key, Data1] of Object.entries(data)) {
    getIdDivice(value => {
      Divi_id = value[0]
      let aceleromedata = JSON.stringify(Object.assign({}, Data1))
      debugger
      console.log(aceleromedata)
      db.transaction(function (tx) {
        console.log(Divi_id)
        console.log(indice)
        tx.executeSql(
          'INSERT INTO table_Data(TableData_id, Expe_id, TableDivi_id, Data) VALUES (?,?,?,?)',
          [, indice,Divi_id , aceleromedata],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log("evento registrado")
            } else alert('Registration Failed');
          }
        );
      });
    }, indice, key)
  }
};

export const addDivice = (Divice) => {
  let Divi_id;
  getindiceExp(value => {
    console.log(value)
    indice = value[0]
    getIdDivice(Divi_id => {
      debugger
      console.log(typeof(Divi_id[0])==='undefined')
      if ((typeof(Divi_id[0])==='undefined')){
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO table_Divice (TableDivi_id, Expe_id, Macaddres, serviceuuid, caracteristica) VALUES (?,?,?,?,?)',
            [, indice, Divice.getMacaddres(), Divice.getserviceuuids(), Divice.getcaracteristica()],
            (tx, results) => {
              console.log('Results', results);
              if (results.rowsAffected > 0) {
                console.log("evento registrado inset en table_Experimento")
              } else alert('Registration Failed');
            }, function (tx, error) {
              reject(error);
            });
        });
      }else{
        console.log("ya se registro")
      }
      
    }, indice, Divice.getMacaddres())

    
  })
};

const getindiceExp = (callback) => {
  db.transaction((tx) => {
    query = "SELECT MAX(Expe_id) as id FROM table_Experimento";
    tx.executeSql(query,
      [], (tx, results) => {
        //console.log("\n\nQuery completed\n");
        var resultItemIdArr = new Array();
        for (let i = 0; i < results.rows.length; i++) {
          resultItemIdArr.push(results.rows.item(i).id);
          //console.log(results.rows.item(i).id);
        }
        callback(resultItemIdArr);
      });
  });
};

const getIdDivice = (callback, indice, key) => {
  db.transaction((tx) => {
    query = "SELECT TableDivi_id as id FROM table_Divice where Macaddres=? AND Expe_id =?";
    tx.executeSql(query,
      [key, indice], (tx, results) => {
        //console.log("\n\nQuery completed\n");
        var resultItemIdArr = new Array();
        for (let i = 0; i < results.rows.length; i++) {
          resultItemIdArr.push(results.rows.item(i).id);
          // console.log(results.rows.item(i).id);
        }
        callback(resultItemIdArr);
      });
  });
};


export const getdata = async () => {
  db.transaction(function (tx) {
    tx.executeSql(
      'SELECT MAX(Expe_id) FROM table_Experimento',
      [],
      (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        console.log(results.rows.item(i))
        //temp.push();
        // setItems(temp);

        // if (results.rows.length >= 1) {
        //   setEmpty(false);
        // } else {
        //   setEmpty(true)
        // }
      }
    );
  });
};

export const getExperimento = async(callback) => {
  db.transaction((tx) => {
    //query = "SELECT * FROM table_Divice";
    query = "SELECT * FROM table_Experimento";
    tx.executeSql(query, [], (tx, results) => {
      //console.log("\n\nQuery completed\n");
      var resultItemIdArr = new Array();
      for (let i = 0; i < results.rows.length; i++) {
        resultItemIdArr.push(results.rows.item(i));
        // console.log(results.rows.item(i).id);
      }
      callback(resultItemIdArr);
    });
  });
};

export const getExperimento1 = async(callback) => {
  db.transaction((tx) => {
    query = "SELECT * FROM table_Data where Expe_id=?";
    tx.executeSql(query, ["3"], (tx, results) => {
      //console.log("\n\nQuery completed\n");
      var resultItemIdArr = new Array();
      for (let i = 0; i < results.rows.length; i++) {
        resultItemIdArr.push(results.rows.item(i));
        // console.log(results.rows.item(i).id);
      }
      callback(resultItemIdArr);
    });
  });
};

const deleteRecord = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM Student_Table where student_id=?',
      [S_Id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Done',
            'Record Deleted Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('ViewAllStudentScreen'),
              },
            ],
            { cancelable: false }
          );
        }
      }
    );
  });

}



