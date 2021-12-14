import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configapp from "../firebase";
import back from "./img/pic1.jpg";
import "firebase/firestore";

import { AuthContext } from "./Auth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex ",
    justifyContent: "center ",
    alignItems: "center ",
    height: "100vh",
    flexDirection: "column",
  },
  child: {
    width: "45%",
  },
  multilineColor: {
    color: "green",
  },
  color: {
    color: "green",
  },
}));
const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { currentUser, UserDeatils } = React.useContext(AuthContext);

  const notify = (error) =>
    toast(error, { position: "top-left", type: "error" });

  const Modify = (e) => {
    var value = e.target.value;
    e.target.type == "email" ? setEmail(value) : setPassword(value);
  };
  const Add = (e) => {
    configapp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((e) => {
        configapp
          .firestore()
          .collection("users")
          .doc(`${e.user.uid}`)
          .get()
          .then((snapshot) => {
            if (e.user.emailVerified) {
              if (snapshot.data()["role"] != "Admin") {
                configapp.auth().signOut();
                notify("You are not registered");
              } else {
                configapp
                  .firestore()
                  .collection("users")
                  .doc(`${e.user.uid}`)
                  .update({
                    Status: "true",
                  })
                  .then(() => {
                    localStorage.setItem(
                      "currentUser",
                      JSON.stringify(snapshot.data())
                    );
                    props.history.push("/Home");
                  })
                  .catch(() => {
                    console.log(4);
                  });
              }
            } else {
              notify("User Not Verify Please Verify Your Account");
            }
          })

          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      })
      .catch((e) => {
        console.log(e);
        notify(e.message);
      });
  };
  const Register = (e) => {
    window.location.href = "/Register";
  };
  // React.useEffect(() => {
  //   console.log(currentUser);
  //   if (currentUser) {
  //     if (UserDeatils.role == "Admin") {
  //       props.history.push("/Home");
  //     } else if (UserDeatils.role != "Admin") {
  //       props.history.push("/UserHome");
  //     }
  //   }
  // }, []);

  return (
    <div
      className={classes.container}
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: `cover`,
      }}
    >
      <h1 className={classes.color}> Login</h1>
      <div className={classes.child}>
        <TextField
          InputProps={{
            className: classes.multilineColor,
          }}
          name="Email"
          id="a"
          className="a"
          type="email"
          value={email}
          label="Email"
          fullWidth
          onChange={Modify}
        />

        <TextField
          name="password"
          id=""
          InputProps={{
            className: classes.multilineColor,
          }}
          type="password"
          value={password}
          label="Password"
          onChange={Modify}
          fullWidth
        />
        <br />
        <br />

        <Button
          variant="contained"
          color="primary"
          id=""
          value=""
          onClick={Add}
        >
          LogIn
        </Button>
        <Button
          variant="contained"
          color="primary"
          id=""
          value=""
          onClick={Register}
          className="ml-3"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;
