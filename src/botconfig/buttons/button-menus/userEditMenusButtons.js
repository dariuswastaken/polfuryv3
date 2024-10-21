export const buttons = {
    editMenu: [
        {
            id: `edit-user-name/%targetid%`,
            style: 'Secondary',
            label: '✏️ Nume'
        },
        {
            id: `edit-user-idserver/%targetid%`,
            style: 'Secondary',
            label: '✏️ ID Server'
        },
        {
            id: `edit-user-id/%targetid%`,
            style: 'Danger',
            label: '✏️ ID Discord'
        },
        {
            id: `edit-user-data-intrare/%targetid%`,
            style: 'Secondary',
            label: '✏️ Data Intrare'
        },
        {
            id: `edit-user-scoatere-av/%targetid%`,
            style: 'Secondary',
            label: '✏️ Scoate Avertisment'
        },
        {
            id: `edit-user-delete/%targetid%`,
            style: 'Danger',
            label: '🗑️ Sterge User'
        },
        {
            id: `edit-user-snapshot/%targetid%`,
            style: 'Success',
            label: '📸 Creeaza Snapshot'
        },
        {
            id: `edit-user-snapshot-load/%targetid%`,
            style: 'Secondary',
            label: '📥 Incarca Snapshot'
        },
        {
            id: `edit-user-snapshot-delete/%targetid%`,
            style: 'Secondary',
            label: '🗑️ Sterge Snapshot'
        }
    ],
    deleteUser: [
        {
            id: `menu-delete-user/confirm/%targetid%/%uid%`,
            style: 'Danger',
            label: '✅ Confirmare'
        },
        {
            id: `menu-delete-user/cancel/%targetid%/%uid%`,
            style: 'Secondary',
            label: '❌ Anulare'
        }
    ]
};
