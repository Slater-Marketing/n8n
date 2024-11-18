import { CredentialsModal, WorkflowPage } from '../pages';
import { getVisibleSelect } from '../utils';

const workflowPage = new WorkflowPage();
const credentialsModal = new CredentialsModal();

export const getHomeButton = () => cy.getByTestId('project-home-menu-item');
export const getMenuItems = () => cy.getByTestId('project-menu-item');
export const getAddProjectButton = () =>
	cy.getByTestId('add-project-menu-item').should('contain', 'Add project').should('be.visible');
export const getProjectTabs = () => cy.getByTestId('project-tabs').find('a');
export const getProjectTabWorkflows = () => getProjectTabs().filter('a[href$="/workflows"]');
export const getProjectTabCredentials = () => getProjectTabs().filter('a[href$="/credentials"]');
export const getProjectTabExecutions = () => getProjectTabs().filter('a[href$="/executions"]');
export const getProjectTabSettings = () => getProjectTabs().filter('a[href$="/settings"]');
export const getProjectSettingsNameInput = () =>
	cy.getByTestId('project-settings-name-input').find('input');
export const getProjectSettingsSaveButton = () => cy.getByTestId('project-settings-save-button');
export const getProjectSettingsCancelButton = () =>
	cy.getByTestId('project-settings-cancel-button');
export const getProjectSettingsDeleteButton = () =>
	cy.getByTestId('project-settings-delete-button');
export const getProjectMembersSelect = () => cy.getByTestId('project-members-select');
export const addProjectMember = (email: string, role?: string) => {
	getProjectMembersSelect().click();
	getProjectMembersSelect().get('.el-select-dropdown__item').contains(email.toLowerCase()).click();

	if (role) {
		cy.getByTestId(`user-list-item-${email}`)
			.find('[data-test-id="projects-settings-user-role-select"]')
			.click();
		getVisibleSelect().find('li').contains(role).click();
	}
};
export const getResourceMoveModal = () => cy.getByTestId('project-move-resource-modal');
export const getProjectMoveSelect = () => cy.getByTestId('project-move-resource-modal-select');

export function createProject(name: string) {
	getAddProjectButton().click();

	getProjectSettingsNameInput().should('be.visible').clear().type(name);
	getProjectSettingsSaveButton().click();
}

export function createWorkflow(fixtureKey: string, name: string) {
	workflowPage.getters.workflowImportInput().selectFile(`fixtures/${fixtureKey}`, { force: true });
	workflowPage.actions.setWorkflowName(name);
	workflowPage.getters.saveButton().should('contain', 'Saved');
	workflowPage.actions.zoomToFit();
}

export function createCredential(name: string, closeModal = true) {
	credentialsModal.getters.newCredentialModal().should('be.visible');
	credentialsModal.getters.newCredentialTypeSelect().should('be.visible');
	credentialsModal.getters.newCredentialTypeOption('Notion API').click();
	credentialsModal.getters.newCredentialTypeButton().click();
	credentialsModal.getters.connectionParameter('Internal Integration Secret').type('1234567890');
	credentialsModal.actions.setName(name);
	credentialsModal.actions.save();

	if (closeModal) {
		credentialsModal.actions.close();
	}
}