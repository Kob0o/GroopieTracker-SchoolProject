package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"text/template"
)

type Group struct {
	ID           int      `json:"id"`
	Image        string   `json:"image"`
	Name         string   `json:"name"`
	Members      []string `json:"members"`
	CreationDate int      `json:"creationDate"`
	FirstAlbum   string   `json:"firstAlbum"`
	Relations    struct {
		ID             int                 `json:"id"`
		DatesLocations map[string][]string `json:"datesLocations"`
	} `json:"relations"`
}

type PageData struct {
	Groups []Group
}

func main() {
	// Lire le fichier JSON
	fileData, err := ioutil.ReadFile("data.json")
	if err != nil {
		log.Fatal(err)
	}

	// Convertir le JSON en structure de données
	var data []Group
	err = json.Unmarshal(fileData, &data)
	if err != nil {
		log.Fatal(err)
	}

	// Préparer les données à envoyer au modèle HTML
	pageData := PageData{
		Groups: data,
	}

	fmt.Println(pageData)

	// Charger le modèle HTML avec les données
	tmpl := template.Must(template.ParseFiles("index.html"))

	// Rendre le modèle HTML avec les données
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		err = tmpl.Execute(w, pageData)
		if err != nil {
			log.Fatal(err)
		}
	})

	log.Println("Serveur en écoute sur le port 8080...")
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	fmt.Println("http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8086", nil))
}
