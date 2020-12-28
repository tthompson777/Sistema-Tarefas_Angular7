import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { routing } from './app.routing';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent }  from './app.component';

import { HomeComponent } from './home';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }