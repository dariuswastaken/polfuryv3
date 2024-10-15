import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.modals = {
  displayFormularIntrare: modules.formModals.displayFormularIntrare,
  displayFormularTrecereTest: modules.formModals.displayFormularTrecereTest,
  displayFormularDemisie: modules.formModals.displayFormularDemisie,
  displayMotivConcediuModal: modules.meniuConcediuModals.displayMotivConcediuModal,
  displaySanctionCallsignInputModal: modules.sanctionThreadsModals.displaySanctionCallsignInputModal,
  displaySanctionMotivInputModal: modules.sanctionThreadsModals.displaySanctionMotivInputModal,
  displayInstrMenuCallsignInputModal: modules.subdepManagementModals.displayInstrMenuCallsignInputModal,
  displayInstrActivityCallsignInputModal: modules.subdepManagementModals.displayInstrActivityCallsignInputModal,
  displayUserEditModal: modules.userEditMenuModals.displayUserEditModal
};
