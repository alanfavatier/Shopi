import { createContext, useState, useEffect } from "react";


export const ShoppingCartContext = createContext()

export const initializeLocalStorage= ()=>{
    const accountInLocalStorage = localStorage.getItem("account")
    const signOutInLocalStorage = localStorage.getItem("sign-out")
    let parsedAccount
    let parsedSignOut

    if (!accountInLocalStorage) {
        localStorage.setItem("account", JSON.stringify({}))
        parsedAccount= {}
    }else{
        parsedAccount = JSON.parse(accountInLocalStorage)
    }

    if(!signOutInLocalStorage){
        localStorage.setItem("sign-out", JSON.stringify(false))
        parsedSignOut= false

    }else{
        parsedSignOut= JSON.parse(signOutInLocalStorage)
    }
}

export const ShoppingCartProvider = ({ children }) => {

    //My account
    const [account, setAccount]= useState({})
    //Sign Out
    const [signOut, setSignOut]= useState(false)

    //Shopping cart. increment quantity
    const [count, setCount] = useState(0)

    //Product detail. open/close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    //Product Checkout side menu. open/close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    //Product detail. Show product
    const [productToShow, setProductToShow] = useState({})

    //Shopping cart . add product to cart
    const [cartProducts, setCartProducts] = useState([])
    //Shopping cart . order
    const [order, setOrder] = useState([])

    //Get products
    const [items, setItems] = useState(null)
    //
    const [filteredItems, setFilteredItems] = useState(null)
    //Get products By Title
    const [searchByTitle, setSearchByTitle] = useState(null)
    //Get products By Category
    const [searchByCategory, setSearchByCategory] = useState(null)
    console.log(searchByTitle);

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products").then(response => response.json())
            .then(data => setItems(data));

    }, [])

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }


    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType,items,searchByTitle,searchByCategory) => {
        if (searchType === "BY_TITLE") {
          return  filteredItemsByTitle(items, searchByTitle)
        }
        if (searchType === "BY_CATEGORY") {
            return  filteredItemsByCategory(items, searchByCategory)
          }
        if (searchType === "BY_TITLE_AND_CATEGORY") {
            return  filteredItemsByCategory(items, searchByCategory).filter(item =>item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
          }
          if (!searchType ) {
            return  items
          }
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_TITLE_AND_CATEGORY", items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy("BY_TITLE", items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
      

    }, [items, searchByTitle, searchByCategory])

    console.log(filteredItems);
    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut



        }} >
            {children}
        </ShoppingCartContext.Provider>
    )
}