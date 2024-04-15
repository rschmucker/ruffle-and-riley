import React from "react";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import ImageWithCaption from "../misc/imageWithCaption";
const Ribosomes = "https://openstax.org/apps/archive/20240226.174525/resources/c2a1ec5fe59a9573e0133deb6a3bea65bacf2f63";

export const LessonTitle = "Organelles in Eukaryotic Cells";


// Lesson adapted from:
// https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells
function LessonPage() {
  return (
    <div>
      <br></br>
      <br></br>
      <Typography>“Form follows function” is a principle that many industries follow. In architecture, this principle implies that buildings should be constructed to support the activities housed within them. For example, a skyscraper should include several elevator banks. A hospital should have an easily accessible emergency room.</Typography>
      <br></br>
      <Typography>Our natural world also utilizes the principle of form following function, especially in <b>cell biology</b>. The structure of cell organelles evolved to support their specialized functions. Similar to how organs in your body function, each organelle is a specialized compartment inside the cell with a unique role to perform. For example, in the pancreas there are cells that are responsible for producing digestive enzymes, which are specific types of proteins that help with food digestion. In these pancreas cells, ribosomes - the organelles responsible for protein synthesis - are found in high numbers. This illustrates the principle of form following function: The form (high number of ribosomes) follows the function (protein production). In addition to ribosomes, cells contain many other organelles, each with its distinct function. Throughout this lesson, we'll explore several of these organelles and understand how their specific form supports their function.</Typography>
      <br></br>
      <Typography variant="h5">Ribosomes</Typography>
      <Divider></Divider>
      <Typography><b>Ribosomes</b> are the cell organelles responsible for protein synthesis. Inside the cell, ribosomes may group together into clusters (polyribosomes) or individual ribosomes may float freely in the cytoplasm. Ribosomes are large protein and RNA complexes, each consisting of two subunits, one large and one small (Figure 1). Ribosomes receive their “orders” for protein synthesis from the nucleus that starts the process by transcribing the DNA into messenger RNA (mRNA). After transcription, the mRNA exits the nucleus and travels to the ribosomes located in the cytoplasm. The ribosomes then translate the code provided by the sequence of the nitrogenous bases in the mRNA into a specific order of amino acids linked together to form proteins. Amino acids are the building blocks of proteins and are vital for various cellular functions (e.g., digestion).</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={Ribosomes}
        number="1"
        caption="A large subunit (top) and a small subunit (bottom) comprise ribosomes. During protein synthesis, ribosomes assemble amino acids into proteins."
        width="350px"
        height="283px"/>
      <br></br>
      <Typography variant="h5">Mitochondria</Typography>
      <Divider></Divider>
      <Typography><b>Mitochondria</b> (singular = mitochondrion) are bean-shaped structures each with a double membrane. Mitochondria are often called “powerhouses” of cells because they make adenosine triphosphate (ATP), which is the cell’s main energy-carrying molecule. ATP represents the cell's short-term stored energy. Mitochondria conduct cellular respiration, which is the process that makes ATP using the chemical energy contained in nutrients such as glucose. The cellular respiration process takes in oxygen to break down glucose and outputs ATP plus the side products carbon dioxide (CO2) and water (H2O). In fact, the carbon dioxide that you exhale with every breath comes from the cellular reactions that produce carbon dioxide as a byproduct.</Typography>
      <br></br>
      <Typography>In keeping with our theme of form following function, it is important to note that muscle cells have a very high concentration of mitochondria that produce ATP. Your muscle cells need considerable energy to keep your body moving. When your cells don’t get enough oxygen, they make small amounts of ATP and also produce lactic acid.</Typography>
      <br></br>
      <Typography variant="h5">Peroxisomes</Typography>
      <Divider></Divider>
      <Typography><b>Peroxisomes</b> are small, round organelles enclosed by single membranes. They carry out oxidation reactions that break down fatty acids and amino acids, which are vital for various cellular functions. Oxidation reactions are also crucial in detoxifying poisons that may enter the body. Notably, many of these oxidation reactions produce hydrogen peroxide (H2O2), a substance that can be damaging to cells. However, these reactions are safely confined inside the peroxisomes by its membrane. Within the peroxisomes, enzymes break down the H2O2 into oxygen and water, mitigating potential damage. In liver cells, peroxisomes are particularly important as they detoxify alcohol. Another significant detoxification reaction carried out by peroxisomes involves the breakdown of environmental toxins like formaldehyde, commonly found in various household products and known for its harmful effects on human health.</Typography>
      <br></br>
      <hr></hr>
      <Typography variant="caption" display="block" gutterBottom>
          <b>Material Attribution</b>: Access for free at https://openstax.org/books/biology-2e/pages/1-introduction 
      </Typography>
    </div>
  );
}

export default LessonPage;
