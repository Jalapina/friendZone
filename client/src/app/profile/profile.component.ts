import { Component, OnInit } from '@angular/core';
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
    new Category(1, 'Music' ),
    new Category(2, 'Bar' ),
    new Category(3, 'Physical'),
    new Category(4, 'Food'),
    new Category(5, 'Cinema'),
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
  images = []
  opacity: false
  modal:false
  message 

  constructor(private authenticateService:AuthenticateService, private userService:UserService , private router:Router) { }

  ngOnInit() {
    this.setUserId();
    setTimeout(()=>{
      this.getUser()
    }, 300)
  }

  imageUpload(event) {
    let image = <File>event.target.files[0]
    // console.log(image.name)
    if (!this.validateFile(image.name)) {
        return false;
    }
    
    let fd = new FormData()
    fd.append('userImage',image,image.name);

    this.userService.imageUpload(this.userId,fd).subscribe(res =>{
      setTimeout(()=>{
        this.getUser()
      }, 1000)
    });
    
  }
  
  deleteImage(event){

    this.userService.imageDelete(this.userId,event).subscribe(res => {
      setTimeout(()=>{
        this.getUser()
      }, 800)
    });

  }

  validateFile(name: String) {
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
    this.userActivation.user = this.userId
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
    this.authenticateService.getUserInfo()
  }

  getUser(){
    this.userId = JSON.parse(localStorage.getItem('user'))
    this.userService.getUser(this.userId).subscribe( data =>{ 
      this.name = data['user'].first_name
      this.items = data['user'].hobbies
      this.userInfo.blur = data['user'].blur
      this.userInfo.bio = data['user'].bio
      this.userIsActive = data['user'].active
      if(data['user'].image.length > 0){
        this.images = data['user'].image
        if(this.images.length != 4){
          do{
            this.images.push(null)      
          }
          while(this.images.length <= 3 )
        }
        
      }else{
        this.images = [null,null,null,null]
      }
      if(data['user'].activity){
        this.placeHolder = false
        this.activity = data['user'].activity
      }
    })
  }

  private editUser(){
    this.userInfo._id = this.userId
    this.userInfo.activity = this.activity
    this.userInfo.hobbies = this.items
    this.userService.editUser(this.userInfo)
    setTimeout(()=>{
      this.getUser()
    }, 1000)
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