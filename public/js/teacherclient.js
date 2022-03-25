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
          var teacherid  = formDataVar.get('teacher_id');
          var teacherfname = formDataVar.get('first_name');
          var teacherlname  = formDataVar.get('last_name');
          var teachermname  = formDataVar.get('middle_name');

         console.log(formDataVar);
         $.ajax({
             url: '/teachers/updaterecord',
             type:'GET',
             contentType: "application/json",
             data : {id: teacherid,
                     first_name: teacherfname,
                     last_name: teacherlname,
                     middle_name: teachermname,
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
 