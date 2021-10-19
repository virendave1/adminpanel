import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http'; 
import { HttpClientModule } from '@angular/common/http'; 
import { AdminGuardService } from './adminguard.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './page/category/category.component';
import { SubcategoryComponent } from './page/subcategory/subcategory.component';
import { ProductComponent } from './page/product/product.component';
import { RegisterationComponent } from './page/registeration/registeration.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { OverviewComponent } from './overview/overview.component';
import { FetchuserComponent } from './fetchuser/fetchuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { CreatecategoryComponent } from './createcategory/createcategory.component';
import { CreatesubcategoryComponent } from './createsubcategory/createsubcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { EditsubcategoryComponent } from './editsubcategory/editsubcategory.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { VerifiedreviewComponent } from './verifiedreview/verifiedreview.component';
import { EditreviewComponent } from './editreview/editreview.component';
import { QueryComponent } from './query/query.component';
import { EditqueryComponent } from './editquery/editquery.component';
import { AddqueryComponent } from './addquery/addquery.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { EdittestimonialComponent } from './edittestimonial/edittestimonial.component';
import { CreatetestimonialComponent } from './createtestimonial/createtestimonial.component';
import { FeaturedproductComponent } from './featuredproduct/featuredproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CategoryComponent,
    SubcategoryComponent,
    ProductComponent,
    RegisterationComponent,
    SidebarComponent,
    HeaderComponent,
    OverviewComponent,
    FetchuserComponent,
    EdituserComponent,
    CreatecategoryComponent,
    CreatesubcategoryComponent,
    EditcategoryComponent,
    EditsubcategoryComponent,
    CreateproductComponent,
    EditproductComponent,
    ReviewsComponent,
    VerifiedreviewComponent,
    EditreviewComponent,
    QueryComponent,
    EditqueryComponent,
    AddqueryComponent,
    TestimonialComponent,
    EdittestimonialComponent,
    CreatetestimonialComponent,
    FeaturedproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
