function viewrecord(geturl,uid,title){
  
    $.ajax({
        url: geturl,
        method: 'GET',
        contentType: "application/json",
        data : {id :uid}
      }
 
            
      
    ).then( function (res){
            $('#form-modal .modal-body').html(res);
            $('#form-modal .modal-title').html(title);
            $('#form-modal').modal('show');
    })  
   .fail(function(err,status){
      alert('error:'+err+' status:'+status);
 
   });
 
 
    
 }
 
 function showrecordtodelete(geturl,uid,title){
 
   $.ajax({
       url: geturl,
       method: 'GET',
       contentType: "application/json",
       data : {id :uid}
     }
 
             
   ).then( function (res){
           $('#form-modal .modal-body').html(res);
           $('#form-modal .modal-title').html(title);
           $('#form-modal').modal('show');
   })  
  .fail(function(err,status){
     alert('error:'+err+' status:'+status);
 
  });
 
   
 }
 
 function deleterecord(delurl,uid,title){
 
   if (confirm('Delete this record?')) {
 
      $.ajax({
          url: delurl,
          method: 'GET',
          contentType: "application/json",
          data : {id :uid}
        }
       
      ).fail(function(err,status){
        alert('error:'+err+' status:'+status);
 
     });
 
   
   } 
 
   
 }
 
 
 function showrecordtoedit(geturl,uid,title){
   //alert('inside show record to edit');
   
   $.ajax({
       url: geturl,
       method: 'GET',
       contentType: "application/json",
       data : {id :uid}
     }
 
   ).then( function (res){
           $('#form-modal .modal-body').html(res);
           $('#form-modal .modal-title').html(title);
           $('#form-modal').modal('show');
   })  
  .fail(function(err,status){
     alert('error:'+err+' status:'+status);
 
  });
 
 
   
 }
 
   
 $(document).ready( function()
 {
     $('#editrecordform').submit(function()
     {
          var formDataVar = new FormData($(this)[0]);
          var studentid  = formDataVar.get('student_id');
          var studentfname = formDataVar.get('first_name');
          var studentlname  = formDataVar.get('last_name');
          var studentmname  = formDataVar.get('middle_name');

         console.log(formDataVar);
         $.ajax({
             url: '/students/updaterecord',
             type:'GET',
             contentType: "application/json",
             data : {id: studentid,
                     first_name: studentfname,
                     last_name: studentlname,
                     middle_name: studentmname,
                  },
         //    data: formDataVar,
             dataType: 'json',
          //   contentType: false,
          //   processData: false,
         }).then( function (res){
             $('#form-modal .modal-body').html(res);
             $('#form-modal .modal-title').html(title);
             $('#form-modal').modal('show');
         });  
        
         
     })
 });
 