import React from 'react';

import { cn } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const tableHeader = [
  'Nama Pemesan',
  'Jenis Request',
  'Divisi',
  'Jabatan',
  'Tanggal Pemesanan',
  'Status',
  'Detail',
];

const requests = [
  {
    name: 'Yoga Hartono',
    request: 'Peminjaman',
    divisi: 'Dagri',
    jabatan: 'Pemagang Handal',
    tanggal_pemesanan: '12/12/2021',
    status: 'Approved',
  },
  {
    name: 'Yoga Hartono',
    request: 'Peminjaman',
    divisi: 'Dagri',
    jabatan: 'Pemagang Handal',
    tanggal_pemesanan: '12/12/2021',
    status: 'Ongoing',
  },
  {
    name: 'Yoga Hartono',
    request: 'Peminjaman',
    divisi: 'Dagri',
    jabatan: 'Pemagang Handal',
    tanggal_pemesanan: '12/12/2021',
    status: 'Rejected',
  },
];

export default function Transaction() {
  return (
    <main>
      <div className='h-[45rem] w-[80rem] overflow-hidden rounded-lg bg-white shadow-lg'>
        <Table>
          <TableHeader>
            <TableRow className='bg-gradient-to-r from-main to-secondary'>
              {tableHeader.map((item, index) => (
                <TableHead
                  key={index}
                  className='py-3 text-center font-lexend font-bold text-white'
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell className='py-2 text-center font-lexend font-medium'>
                  {request.name}
                </TableCell>
                <TableCell className='py-2 text-center font-lexend font-medium'>
                  {request.request}
                </TableCell>
                <TableCell className='py-2 text-center font-lexend font-medium'>
                  {request.divisi}
                </TableCell>
                <TableCell className='py-2 text-center font-lexend font-medium'>
                  {request.jabatan}
                </TableCell>
                <TableCell className='py-2 text-center font-lexend font-medium'>
                  {request.tanggal_pemesanan}
                </TableCell>
                <TableCell className='py-2 text-center font-lexend font-medium'>
                  <span
                    className={cn(
                      'font-lenxed rounded-full px-2 py-1 text-xs font-medium',
                      request.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'Ongoing'
                          ? 'bg-orange-100 text-orange-500'
                          : 'bg-red-100 text-red-800',
                    )}
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell className='py-2 text-center'>
                  <button className='rounded bg-main px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-secondary'>
                    Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
