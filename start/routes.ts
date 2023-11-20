import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.home').as('home')
Route.get('/explores', 'HomeController.collection').as('collections')
Route.get('/search', 'HomeController.search').as('search')
Route.get('/artist-list', 'HomeController.artistList').as('artist.list')
Route.get('/categorie/:name', 'HomeController.categorieList').as('categorie.list')
Route.get('/post/:slug', 'PostsController.show').as('post.show')
Route.get('/posts', 'PostsController.postList').as('post.list')

Route.get('/login', 'UsersController.loginShow').as('user.login')
Route.post('/login', 'UsersController.login')

Route.get('/login/forgot-password', 'UsersController.forgotPasswordShow')
Route.post('/login/forgot-password', 'UsersController.forgotPassword')
Route.get('/login/new-password/:username', 'UsersController.newPasswordShow')
Route.post('/login/new-password/:username', 'UsersController.newPassword').as('user.login.password')

Route.get('/register', 'UsersController.registerShow').as('user.register.show')
Route.post('/register', 'UsersController.register').as('user.register')
Route.get('/logout', 'UsersController.logout').as('user.logout')

Route.group(() => {
    Route.group(() => {
        Route.get('/create', 'ProductsController.create').as('product.create')
        Route.post('/create', 'ProductsController.store')
        Route.post('/show/:id', 'ProductsController.addComment')
    }).middleware('auth')
    Route.get('/show/:name', 'ProductsController.show').as('product.show')
    Route.get('/is-liked/:id', 'ProductsController.productIsLiked').middleware('auth')
    Route.get('/download/:id', 'ProductsController.download').as('product.download')
}).prefix('/product')

Route.group(() => {
    Route.get('/', 'DashbordsController.showDashbord')
    Route.get('/statistic', 'DashbordsController.statisticOfActivity')
    Route.get('/collections', 'DashbordsController.collections').as('dashbord.collections')
    Route.delete('/collections/:id', 'DashbordsController.deleteProduct').as('dash.product.delete')
    Route.group(() => {
        Route.get('/create', 'DashbordsController.createCategorie')
        Route.post('/create', 'DashbordsController.saveCategorie')
        Route.delete('/ddelete/:id', 'DashbordsController.deleteCategorie')
    }).prefix('/categorie')
    Route.group(() => {
        Route.get('/create', 'PostsController.create').as('post.create')
        Route.post('/create', 'PostsController.store').as('post.store')
    }).prefix('/post')
    Route.group(() => {
        Route.get('/', 'DashbordsController.getAllUsers').as('dashbord.user')
        Route.delete('/:id', 'DashbordsController.deleteUserById')
    }).prefix('/users')
}).prefix('/dashbord').middleware('auth')

Route.group(() => {
    Route.get('/new', 'CollectionsController.createCollection')
    Route.post('/new', 'CollectionsController.saveCollection')
    Route.get('/add-product', 'CollectionsController.addProductInCollection')
    Route.post('/add-product', 'CollectionsController.saveProductInCollection')
}).prefix('/collection').middleware('auth')

Route.group(()=> {
    Route.get('/:username', 'ProfilesController.showProfile').as('profile.show')
    Route.group(() => {
        Route.get('/', 'ProfilesController.showEditProfile').as('profile.edit')
        Route.post('/', 'ProfilesController.edit')
    }).prefix('/edit/:id').middleware('auth')
}).prefix('/profile')

Route.get('/not-found', 'ErrorsController.pageNotFound').as('error.notFound')
