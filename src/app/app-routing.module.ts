import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './page/category/category.component';
import { SubcategoryComponent } from './page/subcategory/subcategory.component';
import { ProductComponent } from './page/product/product.component';
import { RegisterationComponent } from './page/registeration/registeration.component';
import { OverviewComponent } from './overview/overview.component';
import { FetchuserComponent } from './fetchuser/fetchuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { CreatecategoryComponent } from './createcategory/createcategory.component';
import { CreatesubcategoryComponent } from './createsubcategory/createsubcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { EditsubcategoryComponent } from './editsubcategory/editsubcategory.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { AdminGuardService } from './adminguard.service';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { VerifiedreviewComponent } from './verifiedreview/verifiedreview.component';
import { EditreviewComponent } from './editreview/editreview.component';
import { QueryComponent } from './query/query.component';
import { EditqueryComponent } from './editquery/editquery.component';
import { AddqueryComponent } from './addquery/addquery.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CreatetestimonialComponent } from './createtestimonial/createtestimonial.component';
import { EdittestimonialComponent } from './edittestimonial/edittestimonial.component';
import { FeaturedproductComponent } from './featuredproduct/featuredproduct.component';

const routes: Routes = [
  { path:'', component:LoginComponent, pathMatch: 'full'  },
  {path:'login', component:LoginComponent},
  { path: 'Admin', component: DashboardComponent,canActivate: [AdminGuardService] , children: [  
   { path:'overview', component:OverviewComponent},
   {path:'editquery',component:EditqueryComponent},
   {path:'addquery',component:AddqueryComponent},
   {path:'enquiry',component:QueryComponent},
   {path:'reviews',component:ReviewsComponent},
   {path:'editreview',component:EditreviewComponent},
   {path:'verifiedreview',component:VerifiedreviewComponent},
   { path:'category', component:CategoryComponent},
   {path:'createcategory',component:CreatecategoryComponent},
   { path:'sub-category', component:SubcategoryComponent},
   {path:'edituser',component:EdituserComponent},
   { path:'product', component:ProductComponent},
   {path:'editproduct',component:EditproductComponent},
   {path:'createsub-category',component:CreatesubcategoryComponent},
   { path:'registeration', component:RegisterationComponent},
   { path:'registereduser', component:FetchuserComponent},
   {path:'editcategory',component:EditcategoryComponent},
   {path:'createproduct',component:CreateproductComponent},
   {path:'editsubcategory',component:EditsubcategoryComponent},
   {path:'testimonial',component:TestimonialComponent},
   {path:'createtestimonial',component:CreatetestimonialComponent},
   {path:'edittestimonial',component:EdittestimonialComponent},
   {path:'featuredproduct',component:FeaturedproductComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}