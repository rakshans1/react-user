import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const columnData = [
  { id: 'avatar', label: 'Avatar' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'age',label: 'Age' },
  { id: 'email', label: 'Email' },
  { id: 'mobile',label: 'Mobile' },
];





class RTableHead extends Component {
  render() {
    return(
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                padding={column.disablePadding ? 'none' : 'default'}
              >
              {column.label}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }
}


class RTableBody extends Component {
  render() {
    const {data, page, perPage} = this.props;
    return (
      <React.Fragment>
      {data.slice(page * perPage, page * perPage + perPage).map(user => {
        return(
          <TableRow
            hover
            key={user.id}
          >
            <TableCell>
              <Avatar alt={user.firstName} src={user.avatar}/>
            </TableCell>
            <TableCell>
              {user.firstName}
            </TableCell>
            <TableCell>
              {user.lastName}
            </TableCell>
            <TableCell>
              {user.gender}
            </TableCell>
            <TableCell>
              {user.age}
            </TableCell>
            <TableCell>
              {user.email}
            </TableCell>
            <TableCell>
              {user.mobileNumber}
            </TableCell>
          </TableRow>
        )
      })}
      </React.Fragment>
    )
  }
}


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


class RTable extends Component {
  state = {
    data: users,
    page: 0,
    rowsPerPage: 20,
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const {classes} = this.props;
    const { data, rowsPerPage, page } = this.state;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="users table">
            <RTableHead/>
            <TableBody>
              <RTableBody data={data} page={page} perPage={rowsPerPage}/>
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}


export default withStyles(styles)(RTable);



const users = [{"id":"1","createdAt":"2018-06-20T11:44:20.331Z","firstName":"Brando","lastName":"Upton","dob":"2017-08-27T09:05:37.508Z","email":"Ricardo_Gislason2@yahoo.com","mobileNumber":"737.056.6879 x343","gender":"gender 1","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/Chakintosh/128.jpg"},{"id":"2","createdAt":"2018-06-20T00:38:39.080Z","firstName":"Van","lastName":"Collier","dob":"2018-03-09T07:19:03.605Z","email":"Humberto77@yahoo.com","mobileNumber":"471.848.8101 x448","gender":"gender 2","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/nicoleglynn/128.jpg"},{"id":"3","createdAt":"2018-06-19T22:10:42.319Z","firstName":"Rosalee","lastName":"Runolfsson","dob":"2018-04-07T14:00:19.774Z","email":"Helga_Boehm@yahoo.com","mobileNumber":"372-791-9080 x58821","gender":"gender 3","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/leehambley/128.jpg"},{"id":"4","createdAt":"2018-06-20T15:38:29.895Z","firstName":"Tyson","lastName":"Dibbert","dob":"2018-01-14T16:11:10.192Z","email":"Thurman6@yahoo.com","mobileNumber":"1-960-359-3284 x795","gender":"gender 4","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/m4rio/128.jpg"},{"id":"5","createdAt":"2018-06-20T05:25:52.329Z","firstName":"Lempi","lastName":"Hettinger","dob":"2017-11-08T02:25:23.882Z","email":"Kelli46@gmail.com","mobileNumber":"324-860-9480 x8518","gender":"gender 5","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/nitinhayaran/128.jpg"},{"id":"6","createdAt":"2018-06-20T14:28:18.445Z","firstName":"Nola","lastName":"Rutherford","dob":"2017-11-06T02:11:54.756Z","email":"Elmira87@gmail.com","mobileNumber":"107-042-2925 x68828","gender":"gender 6","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/xtopherpaul/128.jpg"},{"id":"7","createdAt":"2018-06-19T20:53:52.728Z","firstName":"Silas","lastName":"O'Connell","dob":"2017-10-19T00:02:17.333Z","email":"Lisette_Grady@gmail.com","mobileNumber":"(486) 487-6432 x129","gender":"gender 7","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/sementiy/128.jpg"},{"id":"8","createdAt":"2018-06-19T18:19:47.384Z","firstName":"Rex","lastName":"Skiles","dob":"2017-10-28T18:30:54.350Z","email":"Isabell_Lesch@hotmail.com","mobileNumber":"324-438-2368","gender":"gender 8","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mbilalsiddique1/128.jpg"},{"id":"9","createdAt":"2018-06-19T18:44:22.055Z","firstName":"Rudy","lastName":"Swaniawski","dob":"2018-05-15T00:50:30.615Z","email":"Laverne_Morar98@gmail.com","mobileNumber":"186-486-3894","gender":"gender 9","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/uxalex/128.jpg"},{"id":"10","createdAt":"2018-06-20T03:14:58.075Z","firstName":"Kassandra","lastName":"Veum","dob":"2018-03-11T03:38:04.118Z","email":"Kenneth_McLaughlin@hotmail.com","mobileNumber":"1-186-585-3226 x5429","gender":"gender 10","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/richardgarretts/128.jpg"},{"id":"11","createdAt":"2018-06-19T20:47:23.569Z","firstName":"Kaela","lastName":"Shields","dob":"2018-04-30T04:09:11.651Z","email":"Eusebio.Herman@yahoo.com","mobileNumber":"1-822-661-1188","gender":"gender 11","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/emsgulam/128.jpg"},{"id":"12","createdAt":"2018-06-20T13:48:53.664Z","firstName":"Kennith","lastName":"Koch","dob":"2018-06-19T05:12:09.560Z","email":"Rylan.Cruickshank99@yahoo.com","mobileNumber":"1-622-725-6569 x9587","gender":"gender 12","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/guillemboti/128.jpg"},{"id":"13","createdAt":"2018-06-19T18:10:56.729Z","firstName":"Alysson","lastName":"Fadel","dob":"2018-06-20T12:04:30.683Z","email":"Eugene.Vandervort8@hotmail.com","mobileNumber":"214-781-0228","gender":"gender 13","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/shanehudson/128.jpg"},{"id":"14","createdAt":"2018-06-20T03:49:47.703Z","firstName":"Alan","lastName":"Gleichner","dob":"2018-04-16T08:54:46.563Z","email":"Hilario_Rogahn59@yahoo.com","mobileNumber":"(814) 198-8903","gender":"gender 14","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/incubo82/128.jpg"},{"id":"15","createdAt":"2018-06-20T15:26:48.248Z","firstName":"Amira","lastName":"Connelly","dob":"2017-11-21T12:19:57.943Z","email":"Reid_Olson@hotmail.com","mobileNumber":"447-752-4740 x266","gender":"gender 15","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/kushsolitary/128.jpg"},{"id":"16","createdAt":"2018-06-20T11:22:10.923Z","firstName":"Emie","lastName":"Dach","dob":"2017-07-29T12:57:02.213Z","email":"Concepcion40@hotmail.com","mobileNumber":"885.353.2418 x0151","gender":"gender 16","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/buddhasource/128.jpg"},{"id":"17","createdAt":"2018-06-19T22:42:08.555Z","firstName":"Kale","lastName":"Sauer","dob":"2017-12-04T19:42:59.286Z","email":"Mittie_Wilkinson35@hotmail.com","mobileNumber":"1-365-244-9108","gender":"gender 17","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/bluefx_/128.jpg"},{"id":"18","createdAt":"2018-06-20T08:16:51.330Z","firstName":"Constantin","lastName":"Wiegand","dob":"2017-11-22T07:10:08.794Z","email":"Mylene.Schmitt@hotmail.com","mobileNumber":"991.461.8092","gender":"gender 18","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/BrianPurkiss/128.jpg"},{"id":"19","createdAt":"2018-06-20T13:48:27.262Z","firstName":"Kian","lastName":"Jacobs","dob":"2018-03-01T09:16:32.544Z","email":"Vinnie.Miller@hotmail.com","mobileNumber":"323.173.6544 x50158","gender":"gender 19","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/lanceguyatt/128.jpg"},{"id":"20","createdAt":"2018-06-20T06:04:14.512Z","firstName":"Ressie","lastName":"Mayert","dob":"2017-12-28T21:25:52.059Z","email":"Elwyn51@gmail.com","mobileNumber":"597-652-2514 x61197","gender":"gender 20","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/maiklam/128.jpg"},{"id":"21","createdAt":"2018-06-20T10:26:42.721Z","firstName":"Sierra","lastName":"Kovacek","dob":"2018-01-23T05:32:19.223Z","email":"Oliver_Batz91@yahoo.com","mobileNumber":"378.916.4668","gender":"gender 21","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/claudioguglieri/128.jpg"},{"id":"22","createdAt":"2018-06-20T14:36:25.454Z","firstName":"Dangelo","lastName":"Mante","dob":"2017-10-02T02:01:22.653Z","email":"Nayeli_Barton@yahoo.com","mobileNumber":"1-915-613-6875 x83108","gender":"gender 22","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/eddiechen/128.jpg"},{"id":"23","createdAt":"2018-06-19T18:12:37.756Z","firstName":"Yasmeen","lastName":"Pollich","dob":"2018-02-04T23:11:27.214Z","email":"Halie_McGlynn@hotmail.com","mobileNumber":"1-119-168-7740 x182","gender":"gender 23","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/linkibol/128.jpg"},{"id":"24","createdAt":"2018-06-20T01:48:25.230Z","firstName":"Jannie","lastName":"Kiehn","dob":"2018-03-01T01:56:47.925Z","email":"Miguel_Eichmann@gmail.com","mobileNumber":"737.277.9623 x6034","gender":"gender 24","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/ahmetsulek/128.jpg"},{"id":"25","createdAt":"2018-06-19T22:19:24.835Z","firstName":"Macey","lastName":"Wunsch","dob":"2017-12-28T12:19:34.284Z","email":"Breana90@hotmail.com","mobileNumber":"771-973-7178","gender":"gender 25","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/adammarsbar/128.jpg"},{"id":"26","createdAt":"2018-06-20T06:53:30.446Z","firstName":"Moises","lastName":"Durgan","dob":"2018-05-24T11:36:31.162Z","email":"Kelvin_Jones68@yahoo.com","mobileNumber":"490.862.6937 x300","gender":"gender 26","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/abotap/128.jpg"},{"id":"27","createdAt":"2018-06-20T08:04:58.917Z","firstName":"Verona","lastName":"Legros","dob":"2017-08-05T05:47:33.021Z","email":"Jaylon.Raynor16@yahoo.com","mobileNumber":"982.589.1239 x495","gender":"gender 27","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/rdbannon/128.jpg"},{"id":"28","createdAt":"2018-06-20T15:14:01.655Z","firstName":"Gaylord","lastName":"Waters","dob":"2018-06-16T07:17:07.875Z","email":"Jamey12@hotmail.com","mobileNumber":"(096) 444-8338","gender":"gender 28","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/tumski/128.jpg"},{"id":"29","createdAt":"2018-06-20T07:24:34.430Z","firstName":"Erna","lastName":"Metz","dob":"2017-11-04T20:35:08.319Z","email":"Otho.Luettgen61@gmail.com","mobileNumber":"789.694.7177","gender":"gender 29","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/kennyadr/128.jpg"},{"id":"30","createdAt":"2018-06-19T16:44:10.217Z","firstName":"Mya","lastName":"Franecki","dob":"2018-06-07T02:24:28.780Z","email":"Tristian_Bailey81@yahoo.com","mobileNumber":"954.392.4348","gender":"gender 30","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/1markiz/128.jpg"},{"id":"31","createdAt":"2018-06-20T14:11:56.567Z","firstName":"Deion","lastName":"Macejkovic","dob":"2017-06-22T08:43:46.543Z","email":"Gayle.Boehm16@gmail.com","mobileNumber":"039.458.0200 x009","gender":"gender 31","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/nehfy/128.jpg"},{"id":"32","createdAt":"2018-06-19T22:29:45.095Z","firstName":"Vivianne","lastName":"Osinski","dob":"2018-04-13T01:30:30.807Z","email":"Deja_Brekke@yahoo.com","mobileNumber":"008.091.5713 x895","gender":"gender 32","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/rtyukmaev/128.jpg"},{"id":"33","createdAt":"2018-06-20T00:17:13.317Z","firstName":"Marcelino","lastName":"Hand","dob":"2018-05-24T02:07:32.358Z","email":"Rosetta.Dibbert39@hotmail.com","mobileNumber":"878-462-1264","gender":"gender 33","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mhudobivnik/128.jpg"},{"id":"34","createdAt":"2018-06-19T21:40:43.563Z","firstName":"Clementina","lastName":"Beatty","dob":"2017-12-13T09:37:43.429Z","email":"Mary.Keeling@hotmail.com","mobileNumber":"887.415.7693","gender":"gender 34","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mhudobivnik/128.jpg"},{"id":"35","createdAt":"2018-06-20T05:57:49.333Z","firstName":"Eliza","lastName":"Halvorson","dob":"2017-09-23T20:56:06.301Z","email":"Zachery42@yahoo.com","mobileNumber":"809-628-1512 x3049","gender":"gender 35","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/jehnglynn/128.jpg"},{"id":"36","createdAt":"2018-06-19T23:17:32.827Z","firstName":"Madelynn","lastName":"Oberbrunner","dob":"2018-02-12T05:29:43.583Z","email":"Darren.Hackett22@gmail.com","mobileNumber":"673.086.0717","gender":"gender 36","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/thehacker/128.jpg"},{"id":"37","createdAt":"2018-06-19T22:51:51.151Z","firstName":"Hudson","lastName":"Lehner","dob":"2017-11-18T00:17:34.708Z","email":"Earnest.Gottlieb@hotmail.com","mobileNumber":"1-801-897-9769","gender":"gender 37","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/andresenfredrik/128.jpg"},{"id":"38","createdAt":"2018-06-20T12:50:14.806Z","firstName":"Adah","lastName":"Kulas","dob":"2018-03-22T22:05:33.292Z","email":"Pablo_Bogisich@hotmail.com","mobileNumber":"062-063-5295 x13499","gender":"gender 38","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/nicoleglynn/128.jpg"},{"id":"39","createdAt":"2018-06-20T01:36:14.752Z","firstName":"Shannon","lastName":"Zboncak","dob":"2018-01-15T04:51:05.025Z","email":"Lillian.Schuppe@gmail.com","mobileNumber":"(573) 596-8652 x28091","gender":"gender 39","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/shinze/128.jpg"},{"id":"40","createdAt":"2018-06-20T00:58:20.844Z","firstName":"Stephon","lastName":"Hilpert","dob":"2017-12-20T08:31:24.536Z","email":"Katlynn.Jaskolski96@hotmail.com","mobileNumber":"1-355-796-1320 x02541","gender":"gender 40","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mashaaaaal/128.jpg"},{"id":"41","createdAt":"2018-06-19T22:18:49.028Z","firstName":"Cristal","lastName":"Homenick","dob":"2017-09-01T18:12:39.377Z","email":"Jannie_Cummings@gmail.com","mobileNumber":"203.647.5804","gender":"gender 41","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/motionthinks/128.jpg"},{"id":"42","createdAt":"2018-06-19T23:28:03.136Z","firstName":"Roscoe","lastName":"Hayes","dob":"2017-12-06T12:23:42.385Z","email":"Cortney_Bechtelar83@yahoo.com","mobileNumber":"725.310.9490 x31386","gender":"gender 42","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/miguelkooreman/128.jpg"},{"id":"43","createdAt":"2018-06-19T17:34:10.851Z","firstName":"Kamryn","lastName":"Bartell","dob":"2017-11-15T15:48:18.949Z","email":"Frances_Block@hotmail.com","mobileNumber":"1-370-574-8002 x476","gender":"gender 43","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/bennyjien/128.jpg"},{"id":"44","createdAt":"2018-06-19T21:28:20.282Z","firstName":"Abdiel","lastName":"Weber","dob":"2017-12-02T12:12:38.650Z","email":"Jace.Powlowski@yahoo.com","mobileNumber":"485.834.9984 x6876","gender":"gender 44","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/haruintesettden/128.jpg"},{"id":"45","createdAt":"2018-06-19T21:47:35.220Z","firstName":"Cornell","lastName":"Daniel","dob":"2018-05-11T14:51:59.134Z","email":"Charlotte80@yahoo.com","mobileNumber":"(353) 779-1198 x847","gender":"gender 45","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/chrismj83/128.jpg"},{"id":"46","createdAt":"2018-06-20T12:16:46.679Z","firstName":"Noe","lastName":"Bergnaum","dob":"2017-11-19T09:40:47.834Z","email":"Pattie_Considine@hotmail.com","mobileNumber":"867-970-9151 x53782","gender":"gender 46","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/aka_james/128.jpg"},{"id":"47","createdAt":"2018-06-19T21:52:10.309Z","firstName":"Ben","lastName":"Borer","dob":"2017-07-23T13:35:19.643Z","email":"Janelle90@gmail.com","mobileNumber":"811.096.9399 x35078","gender":"gender 47","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/kuldarkalvik/128.jpg"},{"id":"48","createdAt":"2018-06-19T20:22:54.075Z","firstName":"Cassandra","lastName":"Cassin","dob":"2017-11-24T09:31:17.873Z","email":"Presley_Cummings77@yahoo.com","mobileNumber":"1-138-211-7935","gender":"gender 48","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/geobikas/128.jpg"},{"id":"49","createdAt":"2018-06-20T05:46:53.775Z","firstName":"Germaine","lastName":"Goyette","dob":"2018-01-02T22:56:02.423Z","email":"Donnell.Crist@gmail.com","mobileNumber":"1-788-674-7683 x1267","gender":"gender 49","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/dimaposnyy/128.jpg"},{"id":"50","createdAt":"2018-06-20T00:16:02.481Z","firstName":"Malinda","lastName":"Littel","dob":"2017-12-02T19:37:05.284Z","email":"Krystal95@hotmail.com","mobileNumber":"(686) 957-9694","gender":"gender 50","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/gabrielizalo/128.jpg"}]
