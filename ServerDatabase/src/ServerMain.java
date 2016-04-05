import java.net.*;
import java.util.*;
import java.io.*;
 
public class ServerMain
{
	String connected="{\"type\" : \"Connection\",\"isConnected\" : true}";
	String systemready="{\"type\" : \"SystemReady\",\"taskID\" : 4,\"taskName\" : \"Grasp\"}";
	String caseconnected="{\"type\" : \"CaseConnection\",\"isConnected\" : true}";
	String json=
	"{\"type\" : \"event\",\"testID\" : 12345,\"objects\" : [{\"id\" : 123,\"type\" : \"hand\",\"x\" : 0.2341,\"y\" : 0.6521,\"z\" : 0.1254},{\"id\" : 124,\"type\" : \"object\",\"x\" : 0.4245,\"y\" : 0.4234,\"z\" : 0.4246}]}";
    //String score1="{\"score1\" : 1 , \"score3\" : 4 ,  \"score1\" : 1 , \"error1\" : 0, \"error2\" : 1 , \"error3\" :0 }";
    String score1="{\"score1\" : 1 , \"score3\" : 4 , \"error1\" : 0, \"error2\" : 1 , \"error3\" :0 }";
    String score2="{\"score1\" : 2 , \"score3\" : 3 , \"error1\" : 0, \"error2\" : 0 , \"error3\" : 1}" ;
    String score3="{\"score1\" : 3 , \"score3\" : 4 , \"error1\" : 1, \"error2\" : 1 , \"error3\" : 0}";
    String score4="{\"score1\" : 4, \"score3\" : 4 , \"error1\" : 0, \"error2\" : 1 , \"error3\" : 1}";
    String score5="{\"score1\" : 5, \"score3\" : 4 , \"error1\" : 0, \"error2\" : 0 , \"error3\" : 0}";
    String score0="{\"score1\" : -4 , \"score3\" : -4 }";
	public static void main(String[] args)
    {
        new ServerMain();
    } 
     
    public ServerMain() 
    {
        Scanner a = new Scanner(System.in);

        //We need a try-catch because lots of errors can be thrown
        try {
            //Should connect
            ServerSocket sSocket = new ServerSocket(8888);
            System.out.println("Server started at: " + new Date()); 
            //Wait for a client to connect
            Socket socket;
             
            socket= sSocket.accept();
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             
            //Tell the client that he/she has connected
            //output.println("You have connected at: " + new Date());
            //Loop that runs server functions

            while(true) {
            	
            	String message=a.nextLine();
            	if(message.equals("a")){
            		System.out.println(connected);
            		output.println(connected);
            	}else if(message.equals("b")){
            		output.println(caseconnected);
            	}else if(message.equals("c")){
            		output.println(systemready);
            	}else if(message.equals("1")){
            		output.println(score1);
            	}else if(message.equals("2")){
            		output.println(score2);
            	}else if(message.equals("3")){
            		output.println(score3);
            	}else if(message.equals("4")){
            		output.println(score4);
            	}else if(message.equals("5")){
            		output.println(score5);
            	}else if(message.equals("0")){
            		output.println(score0);
            	}
                //This will wait until a line of text has been sent
                System.out.println(message);
               	//output.println(json);
                
            }
        } catch(IOException exception) {
            System.out.println("Error: " + exception);
        }
    }
}