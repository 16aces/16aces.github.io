<?php
if(isset($_POST['email2'])) {
     
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "goverma1@carrswim.org";
    $email_subject = "Join US";
     
     
    function died($error) {
        // your error code can go here
        echo "We are sorry, but there were error(s) found with the form you submitted ";
		echo "with the form you submitted.<br /><br />";
        echo $error."<br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
     
    // validation expected data exists
    if(!isset($_POST['first_name2']) ||
        !isset($_POST['last_name2']) ||
        !isset($_POST['email2'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');      
    }
	
	if (isset($_POST['checkbox1']))	{
		
		$service = 'Is Checked';
	
	}else{

		$service = 'Not checked';
	}
	
	if (isset($_POST['checkbox2'])) {
			
		$staff = 'Is Checked';
	
	}else{

		$staff = 'Not checked';
	}
	if (isset($_POST['checkbox3'])) {
			
		$webHelp = 'Is Checked';
	
	}else{

		$webHelp = 'Not checked';
	}
	if (isset($_POST['checkbox4'])) {
			
		$all = 'Is Checked';
	
	}else{

		$all = 'Not checked';
	}
	if (isset($_POST['checkbox5'])) {
	
		$other = 'Is Checked';
	
	}else{

		$other = 'Not checked';
	}
	
	//check box 1 = Service
	//check box 2 = Staff
	//check box 3 = Web Help
	//check box 4 = All
	//check box 5 = Other
     
    $first_name = $_POST['first_name2']; // required
    $last_name = $_POST['last_name2']; // required
    $email_from = $_POST['email2']; // required
    
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
    $string_exp = "/^[A-Za-z .'-]+$/";
  if(!preg_match($string_exp,$first_name2)) {
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
  }
  if(!preg_match($string_exp,$last_name2)) {
    $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Form details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
    

}


    $email_message .= "First Name: ".clean_string($first_name2)."\n";
    $email_message .= "Last Name: ".clean_string($last_name2)."\n";
	$email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Work: ".clean_string($service)."\n";
	$email_message .= "Work: ".clean_string($staff)."\n";
	$email_message .= "Work: ".clean_string($webHelp)."\n";
	$email_message .= "Work: ".clean_string($all)."\n";
	$email_message .= "Work: ".clean_string($other)."\n";

    
     
     
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers); 
?>
 
<!-- include your own success html here -->
 
Thank you for the interest in joining our group.  We Will get back to you.  Please be patient.

-Staff
 
<?php
}
?>