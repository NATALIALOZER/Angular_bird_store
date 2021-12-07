import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {query} from "@angular/animations";
import {switchMap} from "rxjs/operators";
import {Product} from "../../../models/product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  public form!: FormGroup
  public product!: Product
  public submitted: boolean = false;
  // @ts-ignore
  updateSubcription: Subscription;

  constructor( private route: ActivatedRoute,
               private productService: ProductService,
               private alert: AlertService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params:Params) => {
        return this.productService.getById(params['id'])
    })).subscribe((product:Product) => {
      this.product = product
      this.form = new FormGroup(
        {
          name: new FormControl(product.name, [Validators.required]),
          price: new FormControl(product.price, [Validators.required])
        })
    })
  }

  ngOnDestroy() {
    if(this.updateSubcription) {
      this.updateSubcription.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;

    this.updateSubcription = this.productService.update({
      ...this.product,
      name: this.form.value.name,
      price: this.form.value.price
    }).subscribe( () => {
      this.submitted = false;
      this.alert.warning("Товар оновлено")
    })
  }


}
