import { Directive, HostBinding, HostListener, ElementRef, Renderer2, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    @HostBinding('class.open') isOpen = false;

    //isClicked: boolean;

    constructor(private elemRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit(){
        //this.class = this.elemRef.nativeElement.class;
    }
    @HostListener('click') click() {
        debugger;
        // if (this.isClicked){
        //     this.renderer.removeClass(this.elemRef.nativeElement, 'open');
        // } else{
        //     this.renderer.addClass(this.elemRef.nativeElement, 'open');
        // }
        // this.isClicked = !this.isClicked;
        this.isOpen = !this.isOpen;
    }
}