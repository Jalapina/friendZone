import { Component, OnInit, Input } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { Router } from '@angular/router'
import { AuthenticateService } from '../_services/authenticate.service'
import { UserService } from '../_services/user.service'
import { Category } from './Category'

TagInputModule.withDefaults({
  
  tagInput: {
      placeholder: 'Add a Hobby',
      secondaryPlaceholder: 'Add a Hobby',
      maxItems: 10,
  }
});

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  categories = [
    new Category(1, 'Food' ),
    new Category(2, 'Exercise'),
    new Category(3, 'Cinema'),
    new Category(4, 'Bar'),
    new Category(5, 'Music'),
    new Category(5, 'Dancing'),    
 ];

  classVisible: false
  placeHolder: boolean = true
  userIsActive: boolean
  items: string[] = []
  userInfo:any = {}
  bool = "hello"
  userActivation:any = {}
  name
  bio
  blur
  activity
  userId
  selectedImage
  userImage
  images =  [null,null,null,null]
  opacity: false
  modal:false
  message 
  loading = false
  loadingImages = false
  setting = false
  blurWordCount
  bioWordCount
  blurWordCountCss = false
  bioWordCountCss = false
  disableSave = false
  constructor(private authenticateService:AuthenticateService, private userService:UserService , private router:Router) {}

  ngOnInit() {
    this.loading = true
    this.setUserId()
  }

  imageUpload(event) {
    
    //Handles all Image upload logic

    let image = <File>event.target.files[0]
    this.loadingImages = true
    
    if (!this.validateFile(image.name)) {
        this.loadingImages = false      
        return false;
    }
    
    let fd = new FormData()
    fd.append('userImage',image,image.name);

    this.userService.imageUpload(fd).subscribe(res =>{
      setTimeout(()=>{
        this.getUser()
      }, 0)
    });
    
  }
  wordCountLogic(){

    //Is this shit code? I'll know in a month.
    
    this.blurWordCount = 150 - this.userInfo.blur.length
    this.bioWordCount = 300 - this.userInfo.bio.length

    if (this.blurWordCount <= 0){
      this.blurWordCountCss = true
      this.disableSave = true
      
    }else if(this.blurWordCount > 0){
      this.blurWordCountCss = false
      this.disableSave = false

    }
    if (this.bioWordCount <= 0){
      this.bioWordCountCss = true
      this.disableSave = true
      
    }else if(this.bioWordCount > 0){
      this.bioWordCountCss = false
      this.disableSave = false
      
    }
  }
  deleteImage(image){
    this.loadingImages = true
    this.userService.imageDelete(image).subscribe(res => {
      setTimeout(()=>{
        this.getUser()
      },0)
    });

  }

  validateFile(name: String) {

    //Makes sure the user is not submitting other files like mp3 and such.
    
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == "jpg" || ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg') {
      return true;
    }
    else {
        return false;
    }
  }

  userActive(){
    this.userIsActive = !this.userIsActive
    this.userActivation.active = this.userIsActive
    this.userService.userActivate(this.userActivation)
  }

  selectedActivity(activity:String){
    this.activity = activity
  }

  checkActivty(){
    if(this.activity){
      this.placeHolder = false
    }
  }

  setUserId(){
    
    //Get the user ID first before getting all other data from the JWT

    this.authenticateService.getUserInfo().subscribe(data=>{
      this.userId = data["id"]
      this.getUser()
    });
  }

  getUser(){
    this.userService.getUser(this.userId).subscribe(data =>{ 
      this.name = data['user'].first_name
      this.items = data['user'].hobbies
      this.userInfo.blur = data['user'].blur
      this.userInfo.bio = data['user'].bio
      this.userIsActive = data['user'].active
      this.loadingImages = false
      this.loading = false
      if(data['user'].image.length > 0){
        this.images = data['user'].image
        if(this.images.length != 4){
          do{
            this.images.push(null)      
          }
          while(this.images.length <= 3 )
        }
      }
      if(data['user'].activity){
        this.placeHolder = false
        this.activity = data['user'].activity
      }
      this.wordCountLogic()
    })
  }

  private editUser(){
    
    // Tbh I forgot why I set this function to private and now I'm too afraid to change it.

    this.loading = true

    this.userInfo.activity = this.activity
    this.userInfo.hobbies = this.items
    this.userService.editUser(this.userInfo).subscribe(data=>{
      this.loading = false
    })
  }

  logout(){
    this.authenticateService.logout()
    this.router.navigateByUrl('/login')
  }

  deleteUser(){
    this.userService.deleteUser(this.userId).subscribe(data =>{
      if(data['success'] == true){
        this.router.navigateByUrl('/')
      }else{
        this.message = "User could not be deleted, try again later"
      }
    })
  }

}