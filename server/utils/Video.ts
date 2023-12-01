import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


interface Payload {
  userId: number;
  name: string;
  email: string;
}

class Video{
    public static getCurrentDatetime():string{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return dateTime
    }

}

export default Video