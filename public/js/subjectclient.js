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
          var subjectid  = formDataVar.get('subject_id');
          var subjecttitle = formDataVar.get('subject_title');
          var subjectnumber = formDataVar.get('subject_number');
          var transcriptload = formDataVar.get('transcript_load');
          var payingload  = formDataVar.get('paying_load');
          var teachingload  = formDataVar.get('teaching_load');
         console.log(formDataVar);
        //  console.log('edit user form to submit :'+userid+' '+userfname+' '+userlname);
         $.ajax({
             url: '/subjects/updaterecord',
             type:'GET',
             contentType: "application/json",
             data : {id: subjectid,
                     subject_title: subjecttitle,
                     subject_number: subjectnumber,
                     transcript_load: transcriptload,
                     paying_load: payingload,
                     teaching_load: teachingload,
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
 