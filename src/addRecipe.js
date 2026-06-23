import { collection, addDoc } from "firebase/firestore"
import { db } from "./firebase"

export async function addRecipe() {
  try {
    const docRef = await addDoc(collection(db, "Rezepte"), {
      Titel: "Pizza Margherita",
      Beschreibung: "Einfach und lecker",
      Zutaten: ["Teig", "Tomaten", "Mozzarella", "Basilikum"],
      erstelltAm: new Date()
    })

    console.log("Rezept gespeichert mit ID:", docRef.id)
  } catch (error) {
    console.error("Fehler beim Speichern:", error)
  }
}