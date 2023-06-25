// Sprawdzenie, czy przeglądarka obsługuje Web Storage
if (typeof(Storage) !== "undefined") {
  // Jeśli tak, pobierz dane z pamięci przeglądarki
  var cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    // Jeśli dane istnieją, przekonwertuj je na tablicę i wyświetl w koszyku
    cartItems = JSON.parse(cartItems);
    showCartItems(cartItems);
  } else {
    // Jeśli dane nie istnieją, utwórz pustą tablicę
    cartItems = [];
  }
} else {
  // Jeśli przeglądarka nie obsługuje Web Storage, wyświetl komunikat o błędzie
  alert("Twoja przeglądarka nie obsługuje Web Storage. Nie można korzystać z koszyka zakupowego.");
}

// Funkcja dodawania produktu do koszyka
function addToCart(productName) {
  // Dodaj produkt do tablicy
  cartItems.push(productName);
  // Zapisz tablicę w pamięci przeglądarki
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // Wyświetl zaktualizowany koszyk
  showCartItems(cartItems);
}

// Funkcja wyświetlająca elementy koszyka
function showCartItems(items) {
  var cartList = document.getElementById("cart-list");
  // Wyczyść listę koszyka przed wyświetleniem aktualnych elementów
  cartList.innerHTML = "";
  // Iteruj przez elementy koszyka i dodaj je do listy
  for (var i = 0; i < items.length; i++) {
    var li = document.createElement("li");
    li.textContent = items[i];
    cartList.appendChild(li);
  }
}

function removeFromCart(productName) {
    // Sprawdź, czy produkt istnieje w koszyku
    var index = cartItems.indexOf(productName);
    if (index > -1) {
      // Jeśli produkt został znaleziony, usuń go z tablicy
      cartItems.splice(index, 1);
      // Zapisz zaktualizowaną tablicę w pamięci przeglądarki
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // Wyświetl zaktualizowany koszyk
      showCartItems(cartItems);
    }
  }

// Funkcja wyświetlająca elementy koszyka
function showCartItems(items) {
    var cartList = document.getElementById("cart-list");
    // Wyczyść listę koszyka przed wyświetleniem aktualnych elementów
    cartList.innerHTML = "";
    // Iteruj przez elementy koszyka i dodaj je do listy
    for (var i = 0; i < items.length; i++) {
      var li = document.createElement("li");
      li.textContent = items[i];
      
      var removeButton = document.createElement("button");
      removeButton.textContent = "Usuń";
      // Utwórz funkcję obsługującą zdarzenie kliknięcia przycisku
      removeButton.addEventListener("click", (function(index) {
        return function() {
          removeFromCart(items[index]);
        };
      })(i));
      
      li.appendChild(removeButton);
      cartList.appendChild(li);
    }
  }

