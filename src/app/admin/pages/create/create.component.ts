import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImageSnippet} from "../../../shared/models/interfaces";
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../models/product.model";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input() public events: any;
  @Output() public onAdd: EventEmitter<ImageSnippet> = new EventEmitter<ImageSnippet>();
  public selectedFile!: ImageSnippet;
  public selected: boolean = false;

  public form!: FormGroup;
  constructor( private productService: ProductService,
               private  alert: AlertService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      price: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl(null, [Validators.required]),
      /*image: new FormControl(null, [Validators.required,])*/
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }

    const product: Product = {
      name: this.form.value.name,
      /*category: this.form.value.category,*/
      description: this.form.value.description,
      price: this.form.value.price
    }

    this.productService.create(product).subscribe(() => {
      this.form.reset()
      this.alert.success("Товар успішно створений")
    })
  }


  public processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (el: any) => {
      this.selectedFile = {
        file: file,
        src: el.target.result
      };
      this.selected = true;
      this.onAdd.emit(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }
}
