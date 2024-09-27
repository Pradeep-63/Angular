import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild,TemplateRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/users/user.service';
import { HeaderComponent } from '../header/header.component';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent,LeftSideBarComponent,NgxSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit{
    constructor(private router:Router,
      private cookieService:CookieService,
      private usersDetails:UserService,
      private toaster:ToastrService,
      private spinner:NgxSpinnerService){
      
    }

    allUserDetails:any;
    DeletedUserId!:number 
    page:number=1;
    totalPages:number=1
    pagesArray: number[] = [];
    limit:number=10
    sortby:string='name'
    sort:number=1
    searchTerm$ = new Subject<string>();  // Subject to handle search input
    searchQuery: string = '';
    ngOnInit(): void {
      this.fetchUsers(this.page)
      this.setupSearch()
    }
    // search the data
    setupSearch(): void {
      // Handle search with debouncing and distinct input values
      this.searchTerm$
        .pipe(
          debounceTime(800),  // Wait 300ms after the last input
          distinctUntilChanged(),  // Only trigger if the search input is different
          switchMap((searchQuery) => {
            this.searchQuery = searchQuery;  // Update search query for future fetches
            return this.usersDetails.getAllUsers(
              new HttpParams()
              .set('page', this.page.toString())
              .set('limit', this.limit.toString())
              .set('name', searchQuery)
              .set('sortby',this.sortby)
              .set('sort',this.sort)   
            );
          })
        )
        .subscribe((res: any) => {
          if (res.data) {
            this.page = res.page;
            this.totalPages = res.totalPages;
            this.allUserDetails = res.data;
            this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          }
        });
    }

    // sortby by asc or desc
    sortBy(sortItem:string){
     this.sortby=sortItem
     this.fetchUsers(this.page)
    }
    // sort by asc or desc
    orderBy(sortOrder:number){
      this.sort=sortOrder
      this.fetchUsers(this.page)
    }
    onSearchChange(searchTerm: Event): void {
      this.searchTerm$.next((searchTerm.target as HTMLInputElement).value);  // Trigger the search term subject
    }
    // spinner 
    showSpinner(){
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    }
    
    fetchUsers(page: number): void {
      const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', this.limit.toString())
      .set('name', this.searchQuery)
      .set('sortby',this.sortby)
      .set('sort',this.sort)
      console.log(page);
      this.usersDetails.getAllUsers(params).subscribe((res:any)=>{
        if(res.data){
          console.log(res);
          this.page=res.page
          this.totalPages=res.totalPages
          this.allUserDetails=res.data
          this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        }
      }
    )
    }
  
    getPage(page:number): void {
      if (page !== this.page) {
        this.page=page
        this.fetchUsers(page)
      }
     
    }
    changeLimit(newLimit: number): void {
      this.limit = newLimit;
      this.page = 1; // Reset to page 1 when the limit changes
      this.fetchUsers(this.page); // Call API to fetch new data with updated limit
    }
    // delete modal
    @ViewChild('deleteUserModal') deleteModal!: ElementRef;
    deleteUser(id:number){
      
       if(this.deleteModal != null){
        this.deleteModal.nativeElement.style.display = "block";
        this.deleteModal.nativeElement.style.body.opacity = "0.5";
        this.DeletedUserId=id 
      } 
    }
    onDelete(){
      this.usersDetails.deleteUserById(this.DeletedUserId).subscribe((res:any)=>{
      this.toaster.warning('deleted',"user deleted succesfully")
      this.fetchUsers(this.page)
     })
     this.closeDeleteModal()
    }
    closeDeleteModal(){
      if (this.deleteModal!= null) {
        this.deleteModal.nativeElement.style.display = "none"; // Show modal
      }
    }
    //onedit of the user this functionality will add
    updatedUser={
      name:'',
      email:'',
      fatherName:'',
      Class:'',
    }
     @ViewChild('userModal') openModal!: ElementRef;
    onEdit(userId:number){
      this.usersDetails.getUserById(userId).subscribe((res:any)=>{
        if(res.data){
          this.updatedUser.name=res.data.name
          this.updatedUser.email=res.data.email
          this.updatedUser.fatherName=res.data.fatherName
          this.updatedUser.Class=res.data.Class
        }    
      })
      if (this.openModal != null) {
        this.openModal.nativeElement.style.display = "block"; // Show modal
      }
    }
    closeModal(){
      if (this.openModal != null) {
        this.openModal.nativeElement.style.display = "none"; // Show modal
      }
    }


   
}


