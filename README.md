<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/awiechma/CatX">
    <img src="frontend/react/public/CatX_Logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">CatX</h3>

  <p align="center">
    This repository is the result of a project conducted at the University of Münster in the Geoinformatics bachelors program as part of the course "Geosoftware II."
    <br />
    <br />
    <br />
    
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This project aims to develop a user-friendly platform that facilitates access to pre-trained Machine Learning models for Earth Observation (EO) data. The platform allows users to search, upload, and manage models and their metadata. It implements a STAC-compliant structure and provides a REST API for seamless integration into existing workflows. The system is built with React, Node.js, and PostgreSQL, utilizing Docker for deployment. Future enhancements could include expanded filtering options, full administrative functionality, and the ability for users to edit or delete their models.



### Built With
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Node.js][Node.js]][Node-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Docker][Docker]][Docker-url]


## Features
- **User-Friendly Interface:** Easy navigation for model management.
- **STAC-Compliant Structure:** Standardized metadata for EO data.
- **REST API Integration:** Seamless connection to external systems.
- **Dockerized Deployment:** Simplified installation and scaling.
- **Search & Upload:** Quickly find and add ML models.


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

First you need to have Docker installed and running.

### Installation

1. Clone the Repository
   ```sh
     git clone https://github.com/awiechma/CatX.git
   ```
2. Navigate into the directory
   ```sh
    cd CatX
   ```
 
3. Run the App using docker
    ```sh
    docker compose up --build
   ```

## Import Demo Data
If you wish to use demo data:

1. Navigate into the directory
   ```sh
    cd ./demo_data
   ```
 
2. Run the script in the terminal:
    ```sh
    bash insert_demo.sh
     ```
<br />

If Step 2 does not work

2. Navigate into the directory in git bash:
    ```sh
      cd CatX/demo_data
    ```
3. Run the script using git bash:
    ```sh
      insert_demo.sh
    ```
<!-- USAGE EXAMPLES -->
## Usage
      
After starting the app, visit http://localhost:5173 in your browser. Use the intuitive interface to explore and upload ML models.


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


[contributors-shield]: https://img.shields.io/github/contributors/awiechma/CatX.svg?style=for-the-badge
[contributors-url]: https://github.com/awiechma/CatX/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/awiechma/CatX.svg?style=for-the-badge
[forks-url]: https://github.com/awiechma/CatX/network/members
[stars-shield]: https://img.shields.io/github/stars/awiechma/CatX.svg?style=for-the-badge
[stars-url]: https://github.com/awiechma/CatX/stargazers
[issues-shield]: https://img.shields.io/github/issues/awiechma/CatX.svg?style=for-the-badge
[issues-url]: https://github.com/awiechma/CatX/issues
[license-shield]: https://img.shields.io/github/license/awiechma/Catx?style=for-the-badge
[license-url]: LICENSE
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
