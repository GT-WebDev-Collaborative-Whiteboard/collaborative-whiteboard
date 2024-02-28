import axios from "axios";
import { authenticateUser, registerUser } from "./database/actions/user-handler.js";
import 'dotenv/config'

function testRegister() {
  registerUser("testname", "testpassword", process.env.AUTH_MONGO_URI).then((success) => {
    console.log(success, "creating user");
  });
}

function testAuthenticate() {
  authenticateUser("testname", "wrongpassword", process.env.AUTH_MONGO_URI).then((success) => {
    console.log(success, "authenticate fail");
  });
  authenticateUser("testname", "testpassword", process.env.AUTH_MONGO_URI).then((success) => {
    console.log(success, "authenticate success");
  });
}

function testAuthCode() {
  axios.post()
}

function main() {
  testRegister();
  testAuthenticate();
}

main();