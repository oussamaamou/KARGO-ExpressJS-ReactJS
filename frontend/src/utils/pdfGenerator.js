import jsPDF from "jspdf";

export const generateOrdreMission = (trajet) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.text("ORDRE DE MISSION", 105, 20, null, null, "center");
  
  doc.setFontSize(10);
  doc.text(`Réf: ${trajet._id.substring(0, 8).toUpperCase()}`, 105, 28, null, null, "center");

  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);

  // 1. INFORMATIONS CHAUFFEUR
  doc.setFontSize(14);
  doc.text("1. CONDUCTEUR", 20, 45);
  
  doc.setFontSize(12);
  doc.setFont(undefined, "bold"); 
  doc.text(`Nom & Prénom :`, 20, 55);
  doc.setFont(undefined, "normal"); 
  doc.text(`${trajet.chauffeur?.nom} ${trajet.chauffeur?.prenom || ''}`, 60, 55);

  doc.setFont(undefined, "bold");
  doc.text(`Email :`, 20, 62);
  doc.setFont(undefined, "normal");
  doc.text(`${trajet.chauffeur?.email}`, 60, 62);

  // 2. VÉHICULE
  doc.setFontSize(14);
  doc.text("2. VÉHICULE & ÉQUIPEMENT", 20, 80);

  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text(`Camion :`, 20, 90);
  doc.setFont(undefined, "normal");
  doc.text(`${trajet.camion?.marque} - ${trajet.camion?.immatriculation}`, 60, 90);

  if (trajet.remorque) {
    doc.setFont(undefined, "bold");
    doc.text(`Remorque :`, 20, 97);
    doc.setFont(undefined, "normal");
    doc.text(`${trajet.remorque?.type} - ${trajet.remorque?.immatriculation}`, 60, 97);
  }

  // 3. MISSION
  doc.setFontSize(14);
  doc.text("3. DÉTAILS DE LA MISSION", 20, 115);

  doc.setFillColor(245, 245, 245);
  doc.rect(20, 120, 170, 40, "F"); 

  doc.setFontSize(12);
  doc.setTextColor(0);
  
  doc.setFont(undefined, "bold");
  doc.text("DÉPART", 30, 130);
  doc.setFont(undefined, "normal");
  doc.text(trajet.lieuDepart, 30, 138);
  doc.text(new Date(trajet.dateDepart).toLocaleDateString(), 30, 146);

  doc.setFontSize(20);
  doc.text("→", 105, 138, null, null, "center");

  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("ARRIVÉE", 140, 130);
  doc.setFont(undefined, "normal");
  doc.text(trajet.lieuArrivee, 140, 138);
  doc.text(new Date(trajet.dateArriveePrevue).toLocaleDateString(), 140, 146);

  doc.setFontSize(10);
  doc.text("Ce document tient lieu d'autorisation de circulation pour le chauffeur susmentionné.", 105, 250, null, null, "center");
  
  doc.text("Signature Responsable", 40, 270);
  doc.text("Signature Chauffeur", 150, 270);

  doc.save(`ordre_mission_${trajet._id}.pdf`);
};