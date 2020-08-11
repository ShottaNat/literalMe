import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js';
global.Popper = popper // fixes some issues with Popper and Meteor
import './main.html';
import '../lib/collection.js';


Template.myGallery.helpers({
    // returns all the books in the database based on ID and Path
    allBooks(){
        return bookdb.find();
    },
});

Template.myGallery.events({
    'click .js-delete'(event, instance) {
        console.log("deleting...");
        var myId = this._id;
        $("#deleteId").val(myId);
        $("#confirmModal").modal("show");
    },

    'click .js-edit'(event, instance){
        $("#editImageModal").modal("show");
            var myId = this._id;
            console.log("let's edit "+myId);
            var eTitle = bookdb.findOne({_id:myId}).title;
            var ePath = bookdb.findOne({_id:myId}).path;
            var eAuth = bookdb.findOne({_id:myId}).auth;
            var eDesc = bookdb.findOne({_id:myId}).desc;
            $("#editId").val(myId);
            $("#editAuth").val(eAuth);
            $("#editTitle").val(eTitle);
            $("#editPath").val(ePath);
            $("#editDesc").val(eDesc);
            $(".editHolder").attr("src", ePath);
    },
    'click .js-view'(event, instance){
        $("#viewImagemodal").modal("show");
            var myId = this._id;
            console.log("let's view "+myId);
            console.log("Description Opening")
            var vTitle = bookdb.findOne({_id:myId}).title;
            var vPath = bookdb.findOne({_id:myId}).path;
            var vAuth = bookdb.findOne({_id:myId}).auth;
            var vDesc = bookdb.findOne({_id:myId}).desc;
            $("#viewId").val(myId);
            $("#viewAuth").val(vAuth);
            $("#viewTitle").val(vTitle);
            $("#viewPath").val(vPath);
            $("#viewDesc").val(vDesc);
            $(".viewHolder").attr("src", vPath);       
        
    },
    'click .js-confirm'(event, instance){
        var myId = $("#deleteId").val();
        $("#"+myId).fadeOut('slow',function(){
         bookdb.remove({_id:myId});
         console.log(myId);
    });
  },
    "click .rating"(event) {
        var myId = this.picId;
        const value = $(event.target).val();
        console.log(myId+" : "+value);
        bookdb.update({_id: myId},
      {$set:{
        "ratings": value
      }}
    );
    }
});

Template.myJumbo.events({
    'click .js-addbook'(event, instance){
     console.log("Open modal");
    },

    'click .js-close'(event, instance){
    console.log("closing modal");
    $("#bookTitle").val("");
    $("#bookAuth").val("");
    $("#bookPath").val("");
    $("#bookDesc").val("");
    $(".placeHolder").attr("src","download.png");
    },

    'click .js-save'(event, instance){
    var theTitle = $("#bookTitle").val();
    var theAuth = $("#bookAuth").val();
    var theDesc = $("#bookDesc").val();
    var thePath = $("#bookPath").val();

   bookdb.insert({
      "title": theTitle,
      "auth": theAuth,
      "desc": theDesc,
      "path": thePath
    });   


    console.log("saving...");
    $("#addImageModal").modal("hide");
    $("#bookTitle").val("");
    $("#bookAuth").val("");
    $("#bookPath").val("");
    $("#bookDesc").val("");
  },
  'input #bookPath'(event, instance){
    $(".placeHolder").attr("src",$("#bookPath").val());
  }
 }); 

Template.editImage.events({
  'click .js-upImage'(event, instance){
    var newTitle = $("#editTitle").val();
    var newPath = $("#editPath").val();
    var newDesc = $("#editDesc").val();
    var newAuth = $("#editAuth").val();
    var updateId = $("#editId").val();
    console.log("saving...");
    $("#editImageModal").modal("hide");
    console.log("The new ID "+updateId+" The Author is "+newAuth+" Book with title "+newTitle+" and its path is "+newPath+" and its description "+newDesc);
    bookdb.update({_id: updateId},
      {$set:{
        "title": newTitle,
        "auth": newAuth,
        "path": newPath,
        "desc": newDesc
      }}

    );
  } 
});


Template.BookDescription.events({

});


