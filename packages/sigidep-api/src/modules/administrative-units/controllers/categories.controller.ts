import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from '@modules/administrative-units/services/categories.service';

@Controller('categories')
@ApiTags('Categories')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly services: CategoriesService) {}

  @Get('/')
  // @UseGuards(new PermissionsGuard([]))
  public async filter() {
    return this.services.filter();
  }
}
