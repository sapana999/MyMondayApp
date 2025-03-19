// services/mappingService.js
const actionIOFields = [
    { field_id: 1, field_name: 'Board ID', type: 'text', description: 'The ID of the monday.com board' },
    { field_id: 2, field_name: 'Item ID', type: 'text', description: 'The ID of the monday.com item to be created' },
  ];
  
  function mapTriggerToAction(triggerFields) {
    return actionIOFields.map(actionField => {
      const correspondingField = triggerFields.find(field => field.field_name === actionField.field_name);
      return {
        ...actionField,
        value: correspondingField ? correspondingField.value : null,
      };
    });
  }
  
  module.exports = { mapTriggerToAction };
  