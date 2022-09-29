import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.home').as('home')
Route.get('/post/create', 'PostsController.create').as('post.create').middleware('auth')
Route.post('/post/create', 'PostsController.store').as('post.store').middleware('auth')

Route.get('/login', 'UsersController.loginShow').as('user.login.show')
Route.post('/login', 'UsersController.login').as('user.login')
Route.get('/register', 'UsersController.registerShow').as('user.register.show')
Route.post('/register', 'UsersController.register').as('user.register')
Route.get('/logout', 'UsersController.logout').as('user.logout')


Route.group(() => {
    Route.group(() => {
        Route.get('/create', 'ProductsController.create').as('product.create')
        Route.post('/create', 'ProductsController.store')
    }).middleware('auth')
    Route.get('/show/:id', 'ProductsController.show').as('product.show')
    Route.get('/download/:id', 'ProductsController.download').as('product.download')
}).prefix('/product')

Route.group(()=> {
    Route.get('/:username', 'ProfilesController.showProfile').as('profile.show')
    Route.group(() => {
        Route.get('/', 'ProfilesController.showEditProfile').as('profile.edit')
        Route.post('/', 'ProfilesController.edit')
    }).prefix('/edit/:id').middleware('auth')
}).prefix('/profile')
