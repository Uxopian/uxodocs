---
title: Framework
---

Bienvenue dans la documentation de l'intégration d'ARender dans votre application.
Ce guide montre comment intégrer facilement la visionneuse de documents ARender dans une application hôte et comment interagir avec.
L'intégration est détaillée pour les frameworks suivants :

**React, Angular, Vuejs, Svelte** et pour du pur **JavaScript**.

    
        
```xml
        React<!-- Commentaire nettoyé -->Angular<!-- Commentaire nettoyé -->Vue.js<!-- Commentaire nettoyé -->Svelte<!-- Commentaire nettoyé -->JavaScript<!-- Commentaire nettoyé -->)ins> ****.
```
- Vous devez avoir mis en place une des solutions détaillées ci-dessous pour éviter les erreurs de types CORS lors de la communication entre l'application hôte et ARender.

## Eviter les erreurs CORS
L'application hôte va communiquer avec ARender à l'aide de différentes fonctions mises à disposition dans l'objet window d'ARender, accessibles depuis une iframe.
Cependant, les navigateurs appliquent la Same-Origin Policy, et si ARender et l'application hôte se trouvent sur un domaine différent, les requêtes en question seront bloquées par le navigateur.
Pour éviter cela, voici 4 propositions de solutions, détaillées plus bas, avec différentes approches :

- 1 - Utilisation d'un reverse proxy nginx
- 2 - Installation d'ARender et de l'application hôte sur le même serveur, même port, même protocole
- 3 - Désactiver les restrictions CORS du navigateur
- 4 - Communication via PostMessage


### 1) Utilisation d'un reverse proxy nginx
Un **reverse proxy** agit comme un intermédiaire entre les clients et les serveurs, et peut injecter les en-têtes CORS nécessaires dans les réponses des requêtes. Cela permet de faciliter les communications inter-domaines en faisant en sorte que le proxy se comporte comme le serveur cible, contournant ainsi les restrictions de sécurité imposées par la politique Same-Origin.
Nous utilisons dans cet exemple nginx.

- Télécharger la dernière version lts depuis le site de nginx (Le test a été effectué avec nginx-1.26.2).
- Après décompression, accéder au répertoire config de nginx et modifier le fichier config.conf avec cette configuration :

```shell
# Configuration principale Nginx
worker_processes 1;

events <!-- Expression supprimée -->

http <!-- Commentaire nettoyé -->

		# Reverse proxy d'ARender
		location /arender-app/ <!-- Commentaire nettoyé -->
	}
}
```
Remplacer les valeurs de proxy-pass de l'application hôte et d'ARender avec les url sur lesquelles tournent les deux applications.
Le reverse proxy est ici configuré pour tourner sur localhost:8087.

- Bien sauvegarder les modifications du fichier de configuration et lancer nginx (Pour windows, double-cliquer sur l'exécutable nginx.exe).
NB : En cas de nouvelle modification du fichier de configuration, il conviendra de stopper le processus nginx (dans le gestionnaire des tâches, clic droit sur nginx dans les Processus en arrière-plan puis clic sur Fin de tâche) et de le redémarrer (double clic sur l'exécutable).

La configuration ci-dessus permet d'accéder à votre application hôte sur le port localhost:8087 et à ARender sur localhost:8087/arender-app. C'est cette dernire adresse qu'il faudra utiliser comme base de l'URL d'accès à ARender lors de l'insertion de l'iframe.

### 2) Installation des deux applications sur le même serveur, même port, même protocole
Dans ce scénario, pour éviter les erreurs lors de la communication entre applications d'origines différentes, on place les deux applications sur le **même serveur et même port**. Pour fonctionner, les deux applications doivent également avoir le **même protocole** (http ou https).

Par exemple, l'application hôte se trouvera sur http://app-hote.com et l'application ARender se trouvera sur http://app-hote.com/arender-app.
ARender sera ainsi considéré comme une sous-application de l'application hôte.
 
Il faut toutefois garder à l'esprit qu'en terme de sécurité, ce n'est pas forcément la solution optimale en termes de partage de ressources et de sécurité : si l'une des applications était compromise, l'autre le serait aussi.

### 3) Désactiver les restrictions CORS du navigateur

Cette solution est une solution facile et rapide à mettre en place. Elle consiste à lancer son navigateur *sans les restrictions CORS* ou à utiliser une extension de navigateur pour les désactiver.
Cela est évidemment une **très mauvaise pratique sur un environnement de production**, mais peut convenir pour un test rapide en développement local.

### 4) PostMessage

Il est possible de conserver des domaines différents pour l'application hôte et ARender en utilisant la méthode window.postMessage, qui permet une communication inter-domaines en toute sécurité.

```xml
Pour cela, il faut ajouter ce **** **[script d'initialisation](<!-- Commentaire nettoyé -->)** **** côté ARender :
```

```javascript
function arenderjs_init(arenderjs_)<!-- Commentaire nettoyé -->,
            event.origin,
          );
      }
	  }

	window.addEventListener("message", receiveMessage, false);
 }
```

Dans cette documentation, le script est nommé "arender-custom-starter-script.js" mais ce nom est modifiable, il faudra simplement adapter l'url en conséquence du côté de l'application hôte.

- Si vous avez utilisé le fichier ARender HMI Spring Boot (JAR) pour l'installation d'ARender, placez le script d'initialisation dans le répertoire public. L'url à utiliser à l'étape suivante ppour indiquer l'emplacement du script sera alors : "./arender-custom-starter-script.js"
- Si vous utilisez un serveur Tomcat, placez le script dans le répertoire scripts. L'url à utiliser à l'étape suivante sera alors : "./scripts/arender-custom-starter-script.js"

```xml
<!-- Commentaire nettoyé -->
```

```xml
<!-- Commentaire nettoyé -->
```

On peut ensuite mettre en place les actions voulues en fonction du message reçu :
L'exemple donné ci-dessus concerne la récupération de l'id du document actuellement affiché dans ARender. On décide que pour déclencher cette requête, il faudra que la data passée à postMessage soit "getCurrentDocumentId".
Dans l'exemple ci-dessus, on renvoie un message via la fonction postMessage à l'application hôte (désignée par event.origin, ce qui correspond à http://localhost:5173), avec des **données sous forme d'objet json**, avec un type qui permettra l'identification du message du côté de l'application hôte et un payload avec l'id en question, récupéré grâce à la fonction **getARenderJS().getCurrentDocumentId()** fournie par ARender. Vous pouvez bien sûr structurer ce json comme vous le souhaitez, ou encore le remplacer par une simple string.

NB: Lors des tests sur le script d'initialisation, bien penser à **vérifier qu'ARender a bien été relancé avec la nouvelle version du script** si on n'observe pas de différence. Ne pas hésiter à utiliser des console.log() pour vérifier les valeurs.


Du côté de l'application hôte, il faudra également mettre en place un **event listener pour postMessage** avec une fonction associée.
NB : Si vous choisissez cette solution, les étapes ci-dessous sont à réaliser après la mise en place de l'iframe, décrite page suivante.

****Chaque interaction avec l'objet window de l'iframe décrite dans la documentation devra être adaptée avec des envois de messages, window étant inaccessible directement depuis l'application hôte dans ce cas de figure**.**

Cette fois, l'implémentation variera en fonction du framework utilisé. **Merci de d'abord créer les fichiers et composants nécessaires à votre projet et intégrer l'iframe comme indiqué dans la page suivante, puis revenir ici pour adapter votre code à l'usage de postMessages, comme montré ci-dessous**.

Dans le composant qui intègre votre iframe (cf page suivante), ajouter ce code :
```javascript
    useEffect(() => <!-- Commentaire nettoyé -->

            // Mettre ici les conditions if pour adapter la réponse en fonction de la valeur de event.data
            // Par exemple :
            if (event.data.type === "getCurrentDocumentIdResponse") <!-- Expression supprimée -->
            }
        };
    
        // Création de l'event listener pour les messages postMessage
        window.addEventListener("message", handleIframeResponseMessage);
    
        // ce return permet de fermer la souscription lors de l'unmount du composant React.
        return () => <!-- Expression supprimée -->;
        };
    }, []);

    // Fonction pour envoyer un postMessage pour demander l'id du document couramment chargé
    function testCallUsingPostMessage() <!-- Expression supprimée --> {
            iframeRef.current.contentWindow.postMessage(
            {type:"getCurrentDocumentId"}, "http://localhost:8080/");
        }
    }
```
Il faut également modifier l'url indiquée au niveau de l'iframe pour que le script d'initialisation soit pris en compte, si cela n'a pas été fait au niveau du fichier de paramètres, et ajouter par exemple un bouton pour tester la fonction :
```javascript
**

** testCallUsingPostMessage()}>testCallUsingPostMessage**


```
Vous pouvez en Angular utiliser un service pour la gestion de la création et suppression de l'event listener, messageHandlerService.ts :
```javascript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageHandlerService <!-- Commentaire nettoyé -->

  removeMessageListener(): void <!-- Commentaire nettoyé -->
  }
}
```

Ensuite, modifier arender.component.ts ainsi :

```javascript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageHandlerService } from '../messageHandlerService';

@Component({
  selector: 'app-arender',
  standalone: false,
  
  templateUrl: './arender.component.html',
  styleUrl: './arender.component.css'
})
export class ArenderComponent {
  @ViewChild('iframeRef', { static: false }) iframeRef!: ElementRef<!-- Commentaire nettoyé --> <!-- Commentaire nettoyé -->
    };

    this.messageHandler.addMessageListener(handleIframeResponseMessage);
  }

  ngOnDestroy(): void <!-- Expression supprimée -->;
  }

  testCallUsingPostMessage(): void <!-- Expression supprimée -->,
        'http://localhost:8080/'
      );
    }
  }
}


```

Enfin dans arender.component.html, ajouter l'url du script d'initialisation en paramètre de l'url de l'iframe :

```html

****
**Test d'un appel avec postMessage**

```

Ne pas oublier de modifier le script d'initialisation d'ARender avec le port de votre application Angular (localhost:4200 par exemple).

```javascript
    const iframeRef = ref(null)
    onMounted(() => <!-- Commentaire nettoyé -->
        };
    
        // Création de l'event listener pour les messages postMessage
        window.addEventListener("message", handleIframeResponseMessage);
    
        // ce return permet de fermer la souscription lors de l'unmount du composant.
        return () => <!-- Expression supprimée -->;
        };
    });

    // Fonction pour envoyer un postMessage pour demander l'id du document couramment chargé
    function testCallUsingPostMessage() <!-- Expression supprimée --> {
        iframeRef.value.contentWindow?.postMessage(
          { type: 'getCurrentDocumentId' },
          'http://localhost:8080',
        )
      }
    }
```
Il faut également modifier l'url indiquée au niveau de l'iframe pour que le script d'initialisation soit pris en compte, si cela n'a pas été fait au niveau du fichier de paramètres, et ajouter par exemple un bouton pour tester la fonction :
```html
<!-- Commentaire nettoyé -->
```
Dans le composant qui intègre votre iframe (cf page suivante), ajouter ce code :
```javascript
    let iframeRef;
    onMount(() => <!-- Commentaire nettoyé -->
        };
    
        // Création de l'event listener pour les messages postMessage
        window.addEventListener("message", handleIframeResponseMessage);
    
        // ce return permet de fermer la souscription lors de l'unmount du composant.
        return () => <!-- Expression supprimée -->;
        };
    });

    // Fonction pour envoyer un postMessage pour demander l'id du document couramment chargé
    function testCallUsingPostMessage() <!-- Expression supprimée --> {
        iframeRef.contentWindow?.postMessage(
          { type: "getCurrentDocumentId" },
          "http://localhost:8080"
        );
      }
    }
```
Il faut également modifier l'url indiquée au niveau de l'iframe pour que le script d'initialisation soit pris en compte, si cela n'a pas été fait au niveau du fichier de paramètres, et ajouter par exemple un bouton pour tester la fonction :
```html
**

**testCallUsingPostMessage**
```

En JavaScript, voilà la marche à suivre :
on ajoute au script un event listener pour recevoir les messages, ainsi qu'une fonction callback pour le traitement du message reçu :
```javascript

      // Function to handle messages from iframe
      function handleIframeMessages(event) <!-- Commentaire nettoyé -->
    }
  
    // Add message listener
    window.addEventListener('message', handleIframeMessages);

```
On ajoute ensuite une fonction permettant d'envoyer un message custom :

```javascript
    // Function to send a custom message to the iframe
    function sendCustomMessage() <!-- Expression supprimée -->,
              'http://localhost:8080/'
          );
      } else <!-- Expression supprimée -->;
      }
  }
```

et on ajoute un bouton pour le trigger (ici on ajoute une fonction pour créer de multiples boutons, on pourra la rappeler pour chaque bouton à créer). On n'oubliera pas non plus d'ajouter le paramètre à l'url permettant de charger le script d'initialisation au lancement d'ARender :

```javascript
      // Ajout dynamique de boutons au document si non présents
      function addButton(id, text, clickHandler) <!-- Commentaire nettoyé -->
    }

    addButton('sendCustomMessageButton', 'Send Custom Message', sendCustomMessage);

    setARenderUrl('http://localhost:8080/arondor-arender-hmi/?arenderjs.startupScript=scripts/arender-custom-starter-script.js'); // Set de l'url


```

