import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import  express from 'express';
import { Repository, ObjectLiteral, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { PaginationQueryDto } from './pagination/dto/pagination-query.dto';
import { Paginated } from './paginater.interface';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST) private readonly request: express.Request
    ){}
public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations? : string[]
): Promise<Paginated<T>>{
const findOptions: FindManyOptions<T> = {
            skip: ((paginationQueryDto.page ?? 1) - 1) * (paginationQueryDto.limit ?? 10),
            take: paginationQueryDto.limit ?? 10
        };

        if(where){
            findOptions.where = where;
        }
    if(relations){
            findOptions.relations = relations;
        }

         const totalItems = await repository.count();
        const limit = paginationQueryDto.limit ?? 10;
        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = paginationQueryDto.page ?? 1;
        const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
        const prevPage = currentPage === 1 ? currentPage : currentPage - 1; 
        const baseUrl = this.request.protocol + '://'+ this.request.headers.host + '/';
        const newUrl = new URL(this.request.url, baseUrl);

        const result = await repository.find(findOptions);
       
        const response: Paginated<T> = {
            data: result,
            meta: {
                itemsPerPage: paginationQueryDto.limit ?? 10,
                totalItems: totalItems,
                currentPage: paginationQueryDto.page ?? 1,
                totalPages: totalPages
            },
            links: {
                first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=1`,
                last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
                current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${currentPage}`,
                next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
                previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${prevPage}`,
            }
        }
             return response;
    }
}
