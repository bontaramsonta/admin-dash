<template>
    <div class="row tables">
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Sortable Table</h4>
            <p class="card-description">
              Bootstrap contextual state applied to the row and column
            </p>
            <b-table striped hover responsive :items="itemsTwo">
            </b-table>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
const itemsTwo = [
  {  age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  {  age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  {
    age: 89,
    first_name: 'Geneva',
    last_name: 'Wilson',
    _rowVariant: 'danger'
  },
  {
    age: 40,
    first_name: 'Thor',
    last_name: 'Macdonald',
    _cellVariants: { Status: 'success', age: 'info', first_name: 'warning' }
  },
  { Status: false, age: 29, first_name: 'Dick', last_name: 'Dunlap' }
]
export default {
  name: 'basicTables',
  data () {
    return {
      itemsTwo: itemsTwo,
      fields: [
          {
            key: 'first_name',
            label: 'Person first name',
            sortable: true
          },
          {
            key: 'last_name',
            label: 'Person last name',
            sortable: true
          },
          {
            key: 'age',
            label: 'Person age',
            sortable: true,
          }
      ],
    }
  }
}
</script>