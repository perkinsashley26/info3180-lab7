/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {
        }
    }
});
app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload"> Photo Upload <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});
app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};
/*Upload*////////
app.component('upload-form', {
    name: 'UploadForm',
    template: `<div class="container">
        <h2>Upload Form</h2>
        <div v-if="success != false" class="alert alert-success">
        File Upload Successful
        </div>
        <ul v-if="errors.length" class="alert alert-danger">
        <li v-for="error in errors">{{ error.error_messages }}</li>
        </ul>
        <form method='POST' action='#' enctype='multipart/form-data' @submit.prevent="uploadPhoto">
        <div class="form-group">
        <label for="description" 
        class="description-box">
        Description: </label>
        <textarea id="desc-box" class="form-control-file" name="desc-box"> </textarea></div>
        <div class="form-group">
        <label for="photo">Photo Upload:</label>
        <input type="file" class="form-control-file" name="photo">
        </div>
        <button type="Submit" class="btn btn-primary">Submit</button>
        </form>
    </div>`,
    methods: {
        uploadPhoto(){
            let self = this;
            let form = document.forms[0];
            let form_data = new FormData(form);

            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(jsonResponse => {
                if(jsonResponse.errors != null){
                    self.success = false;
                    self.errors = jsonResponse.errors;
                }else if(jsonResponse.message != null){
                    self.errors = []
                    self.success = true;
                }
            }).catch(error => console.log(error));
        }
    },
    data() {
        return {
            success: false,
            errors: []
        }
    }
});

const UploadForm = app.component('upload-form');
/*End of Upload*/

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: "/upload", component: UploadForm },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');