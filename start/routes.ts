import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.home').as('home')
Route.get('/collection', 'HomeController.collection').as('collections')
Route.get('/search', 'HomeController.search').as('search')
Route.get('/artist-list', 'HomeController.artistList').as('artist.list')
Route.get('/categorie/:name', 'HomeController.categorieList').as('categorie.list')
Route.get('/post/create', 'PostsController.create').as('post.create').middleware('auth')
Route.post('/post/create', 'PostsController.store').as('post.store').middleware('auth')

Route.get('/login', 'UsersController.loginShow').as('user.login')
Route.post('/login', 'UsersController.login')
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

Route.group(() => {
    Route.get('/', 'DashbordsController.showDashbord')
    Route.get('/collections', 'DashbordsController.collections')
    Route.delete('/collections/:id', 'DashbordsController.deleteProduct').as('dash.product.delete')
    Route.group(() => {
        Route.get('/create', 'DashbordsController.createCategorie')
        Route.post('/create', 'DashbordsController.saveCategorie')
    }).prefix('/categorie')
}).prefix('/dashbord').middleware('auth')

Route.group(()=> {
    Route.get('/:username', 'ProfilesController.showProfile').as('profile.show')
    Route.group(() => {
        Route.get('/', 'ProfilesController.showEditProfile').as('profile.edit')
        Route.post('/', 'ProfilesController.edit')
    }).prefix('/edit/:id').middleware('auth')
}).prefix('/profile')
