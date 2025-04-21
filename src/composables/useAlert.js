import Swal from 'sweetalert2'

export const useAlert = () => {
  const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const showSuccess = (message) => {
    toast.fire({
      icon: 'success',
      title: message,
      background: '#f0fdf4', // bg-green-50
      iconColor: '#22c55e', // text-green-500
      color: '#166534' // text-green-800
    })
  }

  const showError = (message) => {
    toast.fire({
      icon: 'error',
      title: message,
      background: '#fef2f2', // bg-red-50
      iconColor: '#ef4444', // text-red-500
      color: '#991b1b' // text-red-800
    })
  }

  return { showSuccess, showError }
}