# <img src="misc/student.svg" width="40"><img src="misc/prof.svg" width="40"> Ruffle&Riley: From Lesson Text to Conversational Tutoring

This project implements a tool for LLM-based authoring and orchestration of conversational tutoring workflows. This happens in two steps: First, the system generates a tutoring script consisting of a series of guiding questions, each with discussion points aligned to the learning objectives automatically using existing lesson texts. These scripts can then be edited by instructional designers to meet their specific needs. Second, the system orchestrates the script via two conversational agents in a free-form dialog in a learning-by-teaching format. The human learner engages with these agents, teaching Ruffle (student agent) with support from Riley (professor agent). This repository is published alongside the paper *Ruffle&Riley: Insights from Designing and Evaluating a LLM-Based Conversational Tutoring System* [1].

<div align="center">
<figure>
  <img
    src="misc/system_architecture.jpg"
    alt="System architecture of Ruffle&Riley."
    style="max-width: 800px; width: 100%; height: auto;">
  <figcaption>System architecture of Ruffle&Riley.</figcaption>
</figure>
</div>


## :zap: Quickstart

A tool for LLM-supported authoring and execution of conversational tutoring systems.

1. Install node.js and npm using the download from [https://nodejs.org](https://nodejs.org)
2. Clone and download this repository with `git clone https://github.com/rschmucker/ruffle-and-riley.git`
3. Navigate into the repository folder and install its dependencies with `npm install`
4. Copy your Azure OpenAI credentials into `.src/env.js`
5. Run the application via `npm start` to run a local deployment

Reach out to [rschmuck@cs.cmu.edu](mailto:rschmuck@cs.cmu.edu) in case you run into problems or need help with anything.


## :pencil: Adding New Lessons

<figure>
  <img
    src="misc/UI.png"
    alt="UI of Ruffle&Riley."
    style="max-width: 800px; width: 100%; height: auto;">
  <figcaption>UI of Ruffle&Riley. (a) Learners are asked to teach Ruffle (student agent) in a free-form conversation and request help as needed from Riley (professor agent). (b) The learner can navigate the lesson material during the conversation. (c) Ruffle encourages the learner to explain the content. (d) Riley responds to a help request. (e) Riley detected a misconception and prompts the learner to revise their response.</figcaption>
</figure>



## Citation

If you use this library please cite our paper:

[1] *Schmucker, R., Xia, M., Azaria, A., Mitchell, T. Ruffle&Riley: Insights from Designing and Evaluating a Large Language Model-Based Conversational Tutoring System. In Proceedings of the International Conference on Artificial Intelligence in Education (AIED ‘24), Springer, Cham, 2024, 75-90.* https://doi.org/10.1007/978-3-031-64302-6_6

```
@InProceedings{Schmucker2024:Ruffle,
author="Schmucker, Robin and Xia, Meng and Azaria, Amos and Mitchell, Tom",
title="Ruffle&Riley: Insights from Designing and Evaluating a Large Language Model-Based Conversational Tutoring System",
booktitle="Artificial Intelligence in Education",
year="2024",
publisher="Springer Nature Switzerland",
address="Cham",
pages="75--90"
}
```
