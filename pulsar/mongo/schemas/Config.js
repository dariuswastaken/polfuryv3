import mongoose from 'npm:mongoose';

const configSchema = new mongoose.Schema({
  guildID: String,
  channelPolitieGrad: String || null,
  channelCertificate: String || null,
  channelCerereConcediu: String || null,
  channelCerereDemisie: String || null,
  channelSanctiuniConducere: String || null,
  channelSanctiuniInspector: String || null,
  channelSolicitariChestor: String || null,
  channelEvidentaTeste: String || null,
  logs: {
    activitate: String || null,
    demisii: String || null,
    concedii: String || null,
    politieGrad: String || null,
    certificate: String || null,
    sanctiuni: String || null,
  },
  aplicatii: {
    instructorRadio: String || null,
    instructorMDT: String || null,
    instructorPilot: String || null,
    instructorMoto: String || null,
    tester: String || null,
    politiaDeFrontiera: String || null,
    anaf: String || null,
    sias: String || null,
  },
});

const Config = new mongoose.model("Config", configSchema);

module.exports = {
  schema: Config,
};
